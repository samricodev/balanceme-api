import { CreateCategoryDto, CategoryEntity } from "../";

export abstract class CategoryDataSource {
  abstract createCategory(category: CreateCategoryDto): Promise<CategoryEntity>;
  abstract getCategories(userId: string): Promise<CategoryEntity[]>;
  abstract updateCategory(category: CategoryEntity): Promise<CategoryEntity>;
  abstract deleteCategory(categoryId: string): Promise<CategoryEntity>;
}