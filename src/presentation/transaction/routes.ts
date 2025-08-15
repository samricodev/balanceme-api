import { Router } from 'express';
import { TransactionController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import {
  TransactionRepositoryImpl,
  TransactionDataSourceImpl,
} from '../../infrastructure';

export class TransactionRoutes {
  static get router() {
    const router = Router();

    const dataSource = new TransactionDataSourceImpl();
    const transactionRepository = new TransactionRepositoryImpl(dataSource);
    const transactionController = new TransactionController(transactionRepository);

    router.post('/create', [AuthMiddleware.validateJWT], transactionController.createTransaction);
    router.get('/:userId', [AuthMiddleware.validateJWT], transactionController.getTransactions);

    return router;
  }
}