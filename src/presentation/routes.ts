import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { AccountRoutes } from "./accounts/routes";

export class AppRoutes {
  static get router(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.router);
    router.use('/api/accounts', AccountRoutes.router);

    return router;
  }
}
