import { AccountModel } from '../../data/mongodb/';
import {
  AccountDataSource,
  RegisterAccountDto,
  AccountEntity,
  CustomError
} from '../../domain';
import { AccountMapper } from '../mappers/account.mapper';

export class AccountDataSourceImpl implements AccountDataSource {
  constructor() { }

  async registerAccount(registerAccountDTO: RegisterAccountDto): Promise<AccountEntity> {
    const { 
      name, 
      userId, 
      type, 
      currency, 
      balance,
      createdAt,
      updatedAt
    } = registerAccountDTO;

    try {
      const exists = await AccountModel.findOne({ userId, name });
      if (exists) {
        console.log('Account already exists for this user with this name');
        throw CustomError.badRequest('Account already exists for this user with this name');
      }

      const account = await AccountModel.create({
        userId,
        name,
        type,
        currency,
        balance,
        createdAt,
        updatedAt
      });

      if (!account) {
        console.log('Error creating account');
        throw CustomError.internalServerError();
      }

      return AccountMapper.accountEntityFromObject(account);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
   
  }

}