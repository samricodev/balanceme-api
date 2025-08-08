import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { LoginUserDto } from "../dtos/auth/login-user.dto";

export abstract class AuthRepository {
  abstract registerUser(userRegister: RegisterUserDto): Promise<UserEntity>;
  abstract loginUser(loginUserDTO: LoginUserDto): Promise<any>;
}
