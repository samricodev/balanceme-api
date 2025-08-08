import { BcryptAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
import { UserMapper } from '../mappers/user.mapper';
import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from '../../domain';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) { }

  async registerUser(registerUserDTO: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDTO;

    try {
      const exists = await UserModel.findOne({ email });
      if (exists) {
        console.log('User already exists with this email');
        throw CustomError.badRequest('User already exists with this email');
      }

      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password)
      });

      if (!user) {
        console.log('Error creating user');
        throw CustomError.internalServerError();
      }

      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }
}
