import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDataSourceImpl implements AuthDataSource {
  async registerUser(registerUserDTO: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDTO;

    try {
      return new UserEntity(
          '1',
          name,
          email,
          password,
        );
      } catch (error) {

        if (error instanceof CustomError) {
          throw error;
        }

        throw CustomError.internalServerError();
      }
    }
}