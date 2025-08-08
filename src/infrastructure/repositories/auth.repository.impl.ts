import { AuthDataSource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthRepositoryImpl implements AuthRepository {
  constructor (private readonly authDatasource: AuthDataSource) {
    
  }
  registerUser(userRegister: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.registerUser(userRegister);
  }

  loginUser(loginUser: LoginUserDto): Promise<any> {
    return this.authDatasource.loginUser(loginUser);
  }
}
