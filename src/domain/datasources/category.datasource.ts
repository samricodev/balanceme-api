import { CreateCategoryDto, CategoryEntity } from "../";

export abstract class CategoryDataSource {
  abstract createCategory(category: CreateCategoryDto): Promise<CategoryEntity>;
  abstract getCategories(userId: string): Promise<CategoryEntity[]>;
}