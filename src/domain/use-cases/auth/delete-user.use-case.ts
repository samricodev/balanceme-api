import { AuthRepository, CustomError, UserEntity } from '../../';

export class DeleteUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(userId: string): Promise<UserEntity> {
    const userDeleted=  await this.authRepository.deleteMyProfile(userId);
    if (!userDeleted) {
      throw CustomError.notFound('User not found');
    }

    return userDeleted;
  }
}