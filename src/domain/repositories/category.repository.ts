import { CreateCategoryDto, CategoryEntity } from '../';

export abstract class CategoryRepository {
  abstract createCategory(categoryData: CreateCategoryDto): Promise<CategoryEntity>;
  abstract getCategories(userId: string): Promise<CategoryEntity[]>;
}