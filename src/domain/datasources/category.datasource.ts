import { RegisterCategoryDto, CategoryEntity } from "../";

export abstract class CategoryDataSource {
  abstract createCategory(category: RegisterCategoryDto): Promise<CategoryEntity>;
  abstract getCategories(userId: string): Promise<CategoryEntity[]>;
}