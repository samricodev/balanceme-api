import { CreateTransactionDto, TransactionEntity } from '../';

export abstract class TransactionDataSource {
  abstract createTransaction(transactionDTO: CreateTransactionDto): Promise<TransactionEntity>;
  abstract getTransactions(transactionId: string): Promise<TransactionEntity[]>;
}  