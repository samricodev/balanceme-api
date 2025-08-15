import { TransactionModel } from '../../data/mongodb';
import {
  TransactionDataSource,
  CreateTransactionDto,
  TransactionEntity,
  CustomError
} from '../../domain';
import { TransactionMapper } from '../mappers/transaction.mapper';

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
        console.log('Error creating transaction');
        throw CustomError.internalServerError();
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

    return transactions.map(transaction => TransactionMapper.transactionEntityFromObject(transaction));
  }
}