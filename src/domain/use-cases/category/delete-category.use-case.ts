import { CategoryDataSource, CategoryEntity, CustomError } from "../../";

export class DeleteCategory {
  constructor(private readonly categoryDataSource: CategoryDataSource) {}

  async execute(categoryId: string): Promise<CategoryEntity> {
    const category = await this.categoryDataSource.getCategories(categoryId);
    if (!category) {
      throw CustomError.notFound('Category not found');
    }

    return this.categoryDataSource.deleteCategory(categoryId);
  }
}