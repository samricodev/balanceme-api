import { Request, Response } from 'express';
import {
  CategoryRepository,
  CreateCategory,
  CreateCategoryDto,
  CustomError,
  GetCategories,
  UpdateCategory,
  UpdateCategoryDto,
  DeleteCategory
} from '../../domain';

export class CategoryController {
  constructor(private categoryRepository: CategoryRepository) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  createCategory = (req: Request, res: Response) => {
    const [error, categoryDto] = CreateCategoryDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    new CreateCategory(this.categoryRepository)
      .execute(categoryDto!)
      .then(category => {
        res.status(201).json(category);
      })
      .catch(err => this.handleError(err, res));
  }

  getCategories = (req: Request, res: Response) => {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    new GetCategories(this.categoryRepository)
      .execute(userId)
      .then(categories => {
        res.status(200).json(categories);
      })
      .catch(err => this.handleError(err, res));
  }

  updateCategory = (req: Request, res: Response) => {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(400).json({ error: 'Category ID is required' });
    }

    const [error, categoryDto] = UpdateCategoryDto.create({ ...req.body });
    if (error) {
      return res.status(400).json({ error });
    }

    new UpdateCategory(this.categoryRepository)
      .execute(categoryDto!, categoryId)
      .then(category => {
        res.status(200).json(category);
      })
      .catch(err => this.handleError(err, res));
  }

  deleteCategory = (req: Request, res: Response) => {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(400).json({ error: 'Category ID is required' });
    }

    new DeleteCategory(this.categoryRepository)
      .execute(categoryId)
      .then(() => {
        res.status(204).send();
      })
      .catch(err => this.handleError(err, res));
  }
}