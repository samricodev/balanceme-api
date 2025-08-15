import { TransactionRepository, CreateTransactionDto, TransactionEntity } from '../../domain';

export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(private readonly transactionDataSource: TransactionRepository) {}

  createTransaction(transaction: CreateTransactionDto): Promise<TransactionEntity> {
    return this.transactionDataSource.createTransaction(transaction);
  }

  getTransactions(userId: string): Promise<TransactionEntity[]> {
    return this.transactionDataSource.getTransactions(userId);
  }
}