import {
  CategoryDataSource,
  CategoryEntity,
  CreateCategoryDto,
  CustomError
} from '../../domain';
import { CategoryMapper } from '../';
import { CategoryModel, UserModel } from '../../data/mongodb';

export class CategoryDataSourceImpl implements CategoryDataSource {
  async createCategory(createCategoryDTO: CreateCategoryDto): Promise<CategoryEntity> {
    const {
      name,
      userId,
      type,
      description,
      icon,
      color,
      transactionCount,
      totalAmount
    } = createCategoryDTO;

    try {
      const existingCategory = await CategoryModel.findOne({ name, userId });
      if (existingCategory) {
        throw CustomError.badRequest('Category with this name already exists for the user');
      }

      const category = await CategoryModel.create({
        userId,
        name,
        type,
        description,
        icon,
        color,
        transactionCount,
        totalAmount
      });

      if (!category) {
        console.log('Error creating category');
        throw CustomError.internalServerError();
      }

      if (userId) {
        await UserModel.findByIdAndUpdate(userId, {
          $push: { categories: category._id }
        });
      }

      return CategoryMapper.categoryEntityFromObject(category);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }

  async getCategories(userId: string): Promise<CategoryEntity[]> {
    try {
      const categories = await CategoryModel.find({ userId });
      return categories.map((category) => CategoryMapper.categoryEntityFromObject(category));
    } catch (error) {
      throw CustomError.internalServerError();
    }
  }

  async updateCategory(category: CategoryEntity): Promise<CategoryEntity> {
    try {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        category.id,
        {
          name: category.name,
          type: category.type,
          description: category.description,
          icon: category.icon,
          color: category.color,
          transactionCount: category.transactionCount,
          totalAmount: category.totalAmount
        },
        { new: true }
      );

      if (!updatedCategory) {
        throw CustomError.notFound('Category not found');
      }

      return CategoryMapper.categoryEntityFromObject(updatedCategory);
    } catch (error) {
      throw CustomError.internalServerError();
    }
  }

  async deleteCategory(categoryId: string): Promise<CategoryEntity> {
    try {
      const category = await CategoryModel.findByIdAndDelete(categoryId);
      if (!category) {
        throw CustomError.notFound('Category not found');
      }
      return CategoryMapper.categoryEntityFromObject(category);
    } catch (error) {
      throw CustomError.internalServerError();
    }
  }
}