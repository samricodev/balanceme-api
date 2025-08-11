import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { LoginUserDto } from "../dtos/auth/login-user.dto";


export abstract class AuthDataSource {
  abstract registerUser(registerUserDTO: RegisterUserDto): Promise<UserEntity>;
  abstract loginUser(loginUserDTO: LoginUserDto): Promise<UserEntity>;
}
