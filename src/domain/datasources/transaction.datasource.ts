import { RegisterTransactionDto, TransactionEntity } from '../';

export abstract class TransactionDataSource {
  abstract createTransaction(transactionDTO: RegisterTransactionDto): Promise<TransactionEntity>;
  abstract getTransactions(transactionId: string): Promise<TransactionEntity[]>;
}  