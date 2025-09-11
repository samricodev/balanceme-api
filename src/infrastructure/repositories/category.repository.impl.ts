import { 
  CreateCategoryDto,
  CategoryRepository,
  CategoryEntity
} from '../../domain';

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDataSource: CategoryRepository) {}

  createCategory(category: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryDataSource.createCategory(category);
  }

  getCategories(userId: string): Promise<CategoryEntity[]> {
    return this.categoryDataSource.getCategories(userId);
  }

  updateCategory(category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryDataSource.updateCategory(category);
  }

  deleteCategory(categoryId: string): Promise<CategoryEntity> {
    return this.categoryDataSource.deleteCategory(categoryId);
  }
}