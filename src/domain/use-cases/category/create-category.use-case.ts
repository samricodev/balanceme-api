import { CreateCategoryDto, CategoryRepository, CustomError } from '../..';

interface CategoryCreated {
  id: string;
  userId: string;
  name: string;
  type: string;
  description?: string | undefined;
}

export class CreateCategory {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(createCategoryDTO: CreateCategoryDto): Promise<CategoryCreated> {
    const category = await this.categoryRepository.createCategory(createCategoryDTO);
    if (!category) {
      throw CustomError.internalServerError('Failed to create category');
    }

    return {
      id: category.id,
      userId: category.userId,
      name: category.name,
      type: category.type,
      description: category.description
    };

  }
}