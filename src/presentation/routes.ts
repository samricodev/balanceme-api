import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { AccountRoutes } from "./account/routes";
import { CategoryRoutes } from "./category/routes";
import { TransactionRoutes } from "./transaction/routes";

export class AppRoutes {
  static get router(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.router);
    router.use('/api/accounts', AccountRoutes.router);
    router.use('/api/categories', CategoryRoutes.router);
    router.use('/api/transactions', TransactionRoutes.router);

    return router;
  }
}
