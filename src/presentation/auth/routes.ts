import { Router } from "express";
import { AuthController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";

export class AuthRoutes {
  static get router(): Router {
    const router = Router();

    const dataSource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(dataSource); 
    const authController = new AuthController(authRepository);

    router.post('/register', authController.registerUser);
    router.post('/login/', authController.loginUser);
    router.get('/profile/:id', [AuthMiddleware.validateJWT], authController.getMe);
    router.put('/profile/:id', [AuthMiddleware.validateJWT], authController.updateMe);
    router.delete('/profile/:id', [AuthMiddleware.validateJWT], authController.deleteMe);
    router.get('/users', [AuthMiddleware.validateJWT], authController.getUsers);
 
    return router;
  }
}
