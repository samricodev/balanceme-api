import { UpdateCategoryDto, CategoryRepository, CustomError } from '../..';

interface CategoryCreated {
  id: string;
  userId: string;
  name: string;
  type: string;
  description?: string | undefined;
}

export class UpdateCategory {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(updateCategoryDTO: UpdateCategoryDto, categoryId: string): Promise<CategoryCreated> {
    const category = await this.categoryRepository.updateCategory(categoryId, updateCategoryDTO);
    if (!category) {
      throw CustomError.internalServerError('Failed to update category');
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