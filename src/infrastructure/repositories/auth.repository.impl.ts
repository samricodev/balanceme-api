import { AuthDataSource, AuthRepository, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor (private readonly authDatasource: AuthDataSource) {
    
  }
  registerUser(userRegister: any): Promise<UserEntity> {
    return this.authDatasource.registerUser(userRegister);
  }
}