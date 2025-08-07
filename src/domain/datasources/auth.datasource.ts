import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";


export abstract class AuthDataSource {
  abstract registerUser(registerUserDTO: RegisterUserDto): Promise<UserEntity>;
  //abstract loginUser(email: string, password: string): Promise<{ message: string, user: any }>; 
}