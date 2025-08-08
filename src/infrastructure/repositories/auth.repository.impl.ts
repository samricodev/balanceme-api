import { AuthDataSource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor (private readonly authDatasource: AuthDataSource) {
    
  }
  registerUser(userRegister: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.registerUser(userRegister);
  }
}
