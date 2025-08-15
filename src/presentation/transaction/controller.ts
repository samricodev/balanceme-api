import { Request, Response } from 'express';
import {
  TransactionRepository,
  CreateTransactionDto,
  CreateTransaction,
  TransactionEntity,
  CustomError
} from '../../domain';

export class TransactionController {
  constructor(private transactionRepository: TransactionRepository) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  createTransaction = (req: Request, res: Response) => {
    const [error, transactionDto] = CreateTransactionDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    new CreateTransaction(this.transactionRepository)
      .execute(transactionDto!)
      .then((transaction: TransactionEntity) => {
        res.status(201).json(transaction);
      })
      .catch(err => this.handleError(err, res));
  }

  getTransactions = (req: Request, res: Response) => {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    this.transactionRepository.getTransactions(userId)
      .then(transactions => {
        res.status(200).json(transactions);
      })
      .catch(err => this.handleError(err, res));
  }

}