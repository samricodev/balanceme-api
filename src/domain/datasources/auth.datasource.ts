import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto, LoginUserDto, UpdateUserDto } from '../';

export abstract class AuthDataSource {
  abstract registerUser(registerUserDTO: RegisterUserDto): Promise<UserEntity>;
  abstract loginUser(loginUserDTO: LoginUserDto): Promise<UserEntity>;
  abstract getMyProfile(userId: string): Promise<UserEntity>;
  abstract updateMyProfile(userId: string, updateUserDTO: UpdateUserDto): Promise<UserEntity>;
  abstract deleteMyProfile(userId: string): Promise<UserEntity>;
  abstract readUsers(): Promise<UserEntity[]>;
}
