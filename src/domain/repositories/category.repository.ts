import { RegisterCategoryDto, CategoryEntity } from '../';

export abstract class CategoryRepository {
  abstract createCategory(categoryData: RegisterCategoryDto): Promise<CategoryEntity>;
  abstract getCategories(userId: string): Promise<CategoryEntity[]>;
}