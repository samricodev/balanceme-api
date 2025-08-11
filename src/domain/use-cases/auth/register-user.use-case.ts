import { SignOptions } from 'jsonwebtoken';
import { JwtAdapter } from '../../../config';
import { AuthRepository, CustomError, RegisterUserDto } from '../../';

type SignToken = (payload: Object, duration: SignOptions['expiresIn']) => Promise<string | null>;

interface UserToken {
  token: string;
  user: { 
    id: string;
    name: string;
    email: string;
  }
}

interface RegisterUserUseCase {
  execute(registerUserDTO: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) { }

  async execute(registerUserDTO: RegisterUserDto): Promise<UserToken> {
    const user = await this.authRepository.registerUser(registerUserDTO);
    const token = await this.signToken({ id: user.id, email: user.email }, '1h');

    if (!token) {
      throw CustomError.internalServerError('Failed to generate token');
    }

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      } 
    }
  }
}  