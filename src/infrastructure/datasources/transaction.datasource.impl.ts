import {
  UserModel,
  AccountModel,
  CategoryModel,
  TransactionModel
} from '../../data/mongodb';

import {
  CustomError,
  TransactionEntity,
  CreateTransactionDto,
  TransactionDataSource
} from '../../domain';

import { TransactionMapper } from '../mappers/transaction.mapper';
import { MovementEmailSender } from '../utils/email/movement.email';

export class TransactionDataSourceImpl implements TransactionDataSource {
  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity> {
    const {
      userId,
      accountId,
      categoryId,
      amount,
      type,
      note,
      date
    } = createTransactionDto;

    try {
      const transaction = await TransactionModel.create({
        userId,
        accountId,
        categoryId,
        amount,
        type,
        note,
        date
      });

      if (!transaction) {
        console.error('Error creando transacción');
        throw CustomError.internalServerError();
      }

      const increment = type === 'expense' ? -amount : amount;
      const updatedAccount = await AccountModel.findOneAndUpdate(
        { _id: accountId, userId },
        {
          $inc: { balance: increment },
          $push: { transactions: transaction._id }
        },
        { new: true }
      );

      if (!updatedAccount) {
        throw CustomError.badRequest("Account not found after transaction");
      }

      const updatedCategory = await CategoryModel.findOneAndUpdate(
        { _id: categoryId, userId },
        {
          $inc: { totalAmount: increment, transactionCount: 1 }
        },
        { new: true }
      );

      if (!updatedCategory) {
        throw CustomError.badRequest("Category not found after transaction");
      }

      if (userId) {
        const user = await UserModel.findById(userId);
        if (user && user.email) {
          await MovementEmailSender.sendNewMovementEmail(user.email, user.name, {
            type: type as 'income' | 'expense' | 'saving' | 'investment',
            amount,
            category: updatedCategory.name,
            date: transaction.date.toDateString(),
            account: updatedAccount.name
          });
        }
      }

      return TransactionMapper.transactionEntityFromObject(transaction);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }


  async getTransactions(userId: string): Promise<TransactionEntity[]> {
    const transactions = await TransactionModel.find({ userId });

    if (!transactions) {
      console.log('Error fetching transactions');
      throw CustomError.internalServerError();
    }

    return transactions.map(transaction => TransactionMapper.transactionEntityFromObject(transaction));
  }
}