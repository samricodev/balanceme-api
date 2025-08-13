import { AuthRepository, UserEntity, UpdateUserDto, CustomError} from '../../';

export class UpdateUser {
  constructor(private authRepository: AuthRepository) { }

  async execute(userId: string, updateUserDTO: UpdateUserDto): Promise<UserEntity> {
    if (!userId || !updateUserDTO) {
      throw CustomError.badRequest('Invalid input data');
    }

    const updatedUser = await this.authRepository.updateMyProfile(userId, updateUserDTO);

    if (!updatedUser) {
      throw CustomError.internalServerError('User update failed');
    }

    return updatedUser;
  }
}