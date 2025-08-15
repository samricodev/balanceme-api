import { CategoryRepository, CategoryEntity, CustomError} from '../../';

export class GetCategories {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(userId: string): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.getCategories(userId);
    if (!categories) {
      throw CustomError.notFound('No categories found for the user');
    }
    return categories;
  }
}