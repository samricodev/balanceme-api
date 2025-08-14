import { RegisterTransactionDto, TransactionEntity } from '../';

export abstract class TransactionRepository {
  abstract createTransaction(transactionData: RegisterTransactionDto): Promise<TransactionEntity>;
  abstract getTransactions(userId: string): Promise<TransactionEntity[]>;
}