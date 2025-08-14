import { 
  AccountEntity, 
  AccountRepository, 
  RegisterAccountDto
} from '../../domain';

export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly accountDataSource: AccountRepository) {}

  registerAccount(accountRegister: RegisterAccountDto): Promise<AccountEntity> {
    return this.accountDataSource.registerAccount(accountRegister);
  }

  getAccountById(id: string): Promise<AccountEntity> {
    return this,this.accountDataSource.getAccountById(id);
  }

  deleteAccount(id: string): Promise<AccountEntity> {
    return this.accountDataSource.deleteAccount(id);
  }
}