import { BcryptAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
import { UserMapper } from '../mappers/user.mapper';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
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

  async loginUser(loginUserDTO: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDTO;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        console.log('User not found');
        throw CustomError.notFound('User not found');
      }
      const isPasswordValid = this.comparePassword(password, user.password);
      if (!isPasswordValid) {
        console.log('Credentials do not match');
        throw CustomError.unauthorized('Credentials do not match');
      }

      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log('Error logging in user');
      throw CustomError.internalServerError();
    }
  }

  async readUsers(): Promise<UserEntity[]> {
    try {
      const users = await UserModel.find();
      if (!users || users.length === 0) {
        console.log('No users found');
        throw CustomError.notFound('No users found');
      }

      return users.map(user => UserMapper.userEntityFromObject(user));
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log('Error reading users');
      throw CustomError.internalServerError();
    }
  }

}
