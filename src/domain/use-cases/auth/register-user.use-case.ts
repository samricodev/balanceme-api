import { AuthRepository, CustomError, RegisterUserDto } from '../../';

interface UserCreated {
  id: string;
  name: string;
  email: string;
}

interface RegisterUserUseCase {
  execute(registerUserDTO: RegisterUserDto): Promise<UserCreated>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository
  ) { }

  async execute(registerUserDTO: RegisterUserDto): Promise<UserCreated> {
    const user = await this.authRepository.registerUser(registerUserDTO);

    if (!user) {
      throw CustomError.notFound('User registration failed');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }
}  