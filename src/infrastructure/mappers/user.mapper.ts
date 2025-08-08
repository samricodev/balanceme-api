import { UserEntity } from '../../domain';

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { _id, id, name, email, password, role } = object;

    if (!id && !_id) {
      throw new Error('Invalid user object: missing id or _id');
    }
    if (!name) {
      throw new Error('Invalid user object: missing name');
    }
    if (!email) {
      throw new Error('Invalid user object: missing email');
    }
    if (!password) {
      throw new Error('Invalid user object: missing password');
    }
    if (!role) {
      throw new Error('Invalid user object: missing role');
    }

    return new UserEntity(
      _id || id,
      name,
      email,
      password,
      role
    );
  }
}
