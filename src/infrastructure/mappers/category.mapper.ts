import { CategoryEntity } from '../../domain';

export class CategoryMapper {
  static categoryEntityFromObject(object: { [key: string]: any }): CategoryEntity {
    const { _id, id, name, userId, type, description } = object;

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

    return new CategoryEntity(
      _id || id,
      name,
      userId,
      type,
      description,
    );
  }
}