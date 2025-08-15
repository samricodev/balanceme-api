import { TransactionRepository, TransactionEntity, CustomError} from '../../';

export class GetTransaction {
  constructor( private readonly transactionRepository: TransactionRepository) {}

  async execute(userId: string): Promise<TransactionEntity[]> {
    const transactions = await this.transactionRepository.getTransactions(userId);
    if (!transactions) {
      throw CustomError.notFound('No transactions found for this user');
    }
    return transactions;
  }
}