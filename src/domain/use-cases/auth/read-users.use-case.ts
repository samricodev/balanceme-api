import { AuthRepository, CustomError, UserEntity} from '../../';

export class ReadUsersUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<UserEntity[]> {
    const users = await this.authRepository.readUsers();
    if (!users || users.length === 0) {
      throw CustomError.notFound('No users found');
    }

    return users;
  }
}