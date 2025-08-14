import { Router } from 'express';
import { AccountController } from './controller';
import { AccountDataSourceImpl, AccountRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AccountRoutes {
  static get router(): Router {
    const router = Router();

    const dataSource = new AccountDataSourceImpl();
    const accountRepository = new AccountRepositoryImpl(dataSource);
    const accountController = new AccountController(accountRepository);

    router.post('/register',[AuthMiddleware.validateJWT], accountController.registerAccount);
    router.get('/:userId', [AuthMiddleware.validateJWT], accountController.getAccounts);
    router.get('/:id', [AuthMiddleware.validateJWT], accountController.getAccountById);
    router.delete('/:id', [AuthMiddleware.validateJWT], accountController.deleteAccount);

    return router;
  }
}