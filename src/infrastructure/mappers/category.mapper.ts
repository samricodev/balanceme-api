import { CategoryEntity } from '../../domain';

export class CategoryMapper {
  static categoryEntityFromObject(object: { [key: string]: any }): CategoryEntity {
    const { _id, id, name, userId, type, description, icon, color, transactionCount, totalAmount } = object;

    if (!id && !_id) {
      throw new Error('Invalid category object: missing id or _id');
    }
    if (!name) {
      throw new Error('Invalid category object: missing name');
    }
    if (!userId) {
      throw new Error('Invalid category object: missing userId');
    }
    if (!type) {
      throw new Error('Invalid category object: missing type');
    }
    if (!description) {
      throw new Error('Invalid category object: missing description');
    }

    if (!icon) {
      throw new Error('Invalid category object: missing icon');
    }

    if (!color) {
      throw new Error('Invalid category object: missing color');
    }

    if (transactionCount === undefined || transactionCount === null) {
      throw new Error('Invalid category object: missing transactionCount');
    }
    if (totalAmount === undefined || totalAmount === null) {
      throw new Error('Invalid category object: missing totalAmount');
    }

    return new CategoryEntity(
      _id || id,
      userId,
      name,
      type,
      icon,
      color,
      transactionCount,
      totalAmount,
      description
    );
  }
}