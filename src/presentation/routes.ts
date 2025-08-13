import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { AccountRoutes } from "./account/routes";

export class AppRoutes {
  static get router(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.router);
    router.use('/api/account', AccountRoutes.router);

    return router;
  }
}
