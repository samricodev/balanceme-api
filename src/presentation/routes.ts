import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get router(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.router);

    return router;
  }
}