import { AuthDataSource, AuthRepository, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor (private readonly authDatasource: AuthDataSource) {
    
  }
  registerUser(userRegister: any): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}