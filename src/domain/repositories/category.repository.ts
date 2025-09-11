import { CreateCategoryDto, UpdateCategoryDto, CategoryEntity } from '../';

export abstract class CategoryRepository {
  abstract createCategory(categoryData: CreateCategoryDto): Promise<CategoryEntity>;
  abstract getCategories(userId: string): Promise<CategoryEntity[]>;
  abstract updateCategory(categoryId: string, categoryData: UpdateCategoryDto): Promise<CategoryEntity>;
  abstract deleteCategory(categoryId: string): Promise<CategoryEntity>;
}