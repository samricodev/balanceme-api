import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";

export class AuthRoutes {
  static get router(): Router {
    const router = Router();

    const dataSource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(dataSource); 
    const authController = new AuthController(authRepository);

    router.post('/register', authController.registerUser);
    router.post('/login', authController.loginUser);
 
    return router;
  }
}
