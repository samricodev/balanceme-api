import { CreateTransactionDto, TransactionEntity } from '../';

export abstract class TransactionRepository {
  abstract createTransaction(transactionData: CreateTransactionDto): Promise<TransactionEntity>;
  abstract getTransactions(userId: string): Promise<TransactionEntity[]>;
}