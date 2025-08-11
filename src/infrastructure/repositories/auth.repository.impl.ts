import { 
  AuthDataSource, 
  AuthRepository, 
  RegisterUserDto, 
  UserEntity, 
  LoginUserDto
} from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor (private readonly authDatasource: AuthDataSource) {
    
  }
  registerUser(userRegister: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.registerUser(userRegister);
  }

  loginUser(loginUser: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.loginUser(loginUser);
  }

  /* getMyProfile(): Promise<UserEntity> {
    return this.authDatasource.getMyProfile();
  }

  updateMyProfile(userId: string, userData: Partial<UserEntity>): Promise<UserEntity> {
    return this.authDatasource.updateMyProfile(userId, userData);
  }

  deleteMyProfile(userId: string): Promise<void> {
    return this.authDatasource.deleteMyProfile(userId); 
  }*/

  readUsers(): Promise<UserEntity[]> {
    return this.authDatasource.readUsers();
  }
}
