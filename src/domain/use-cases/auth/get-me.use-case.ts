import { AuthRepository, UserEntity, CustomError } from '../../';

export class GetMeUseCase {
  constructor(private readonly authRepository: AuthRepository) { }

  async execute(userId: string): Promise<UserEntity> {
    const user = await this.authRepository.getMyProfile(userId);
    if (!user) {
      throw CustomError.notFound('User not found');
    }

    return user;
  }
}