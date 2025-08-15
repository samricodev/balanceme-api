import { Request, Response } from 'express';
import { 
  CategoryRepository,
  CreateCategory,
  CreateCategoryDto,
  CustomError,
  GetCategories,
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
}