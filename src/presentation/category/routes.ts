import { Router } from 'express';
import { CategoryDataSourceImpl, CategoryRepositoryImpl } from '../../infrastructure';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class CategoryRoutes {
  static get router() {
    const router = Router();

    const dataSource = new CategoryDataSourceImpl();
    const categoryRepository = new CategoryRepositoryImpl(dataSource);
    const categoryController = new CategoryController(categoryRepository);

    router.post('/create', [AuthMiddleware.validateJWT], categoryController.createCategory);
    router.get('/:userId', [AuthMiddleware.validateJWT], categoryController.getCategories);

    return router;
  }
}