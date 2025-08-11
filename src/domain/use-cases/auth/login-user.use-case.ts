import { SignOptions } from 'jsonwebtoken';
import { JwtAdapter } from '../../../config';
import { AuthRepository, CustomError, LoginUserDto } from '../../'

type SignToken = (payload: Object, duration: SignOptions['expiresIn']) => Promise<string | null>;

interface UserLogin {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginUserUseCase {
  execute(loginUserDTO: LoginUserDto): Promise<UserLogin>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) { }

  async execute(loginUserDTO: LoginUserDto): Promise<UserLogin> {
    const user = await this.authRepository.loginUser(loginUserDTO);
    if (!user) {
      throw CustomError.unauthorized('Invalid email or password');
    }

    const token = await this.signToken({ id: user.id, email: user.email }, '1h');
    if (!token) {
      throw CustomError.internalServerError('Failed to generate token');
    }

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    };
  }
}