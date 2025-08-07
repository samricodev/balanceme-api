import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";

export abstract class AuthRepository {
  abstract registerUser(userRegister: RegisterUserDto): Promise<{ message: string, user: UserEntity }>;
  // abstract loginUser(email: string, password: string): Promise<{ message: string, user: any }>;
}