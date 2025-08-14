import { CreateTransactionDto, TransactionRepository, TransactionEntity, CustomError} from '../..';

interface TransactionCreated {
  id: string;
  userId: string;
  accountId: string;
  categoryId: string;
  amount: number;
  type: string;
  note: string;
  date: Date;
}

export class CreateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(createTransactionDTO: CreateTransactionDto): Promise<TransactionCreated> {
    const transaction = await this.transactionRepository.createTransaction(createTransactionDTO);
    if (!transaction) {
      throw CustomError.internalServerError('Failed to create transaction');
    }

    return {
      id: transaction.id,
      userId: transaction.userId,
      accountId: transaction.accountId,
      categoryId: transaction.categoryId,
      amount: transaction.amount,
      type: transaction.type,
      note: transaction.note,
      date: transaction.date
    };
  }
}