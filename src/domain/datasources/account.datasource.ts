import { AccountEntity, RegisterAccountDto } from '../';

export abstract class AccountDataSource {
  abstract registerAccount(registerAccountDTO: RegisterAccountDto): Promise<AccountEntity>;
  abstract getAccountById(id: string): Promise<AccountEntity>;
  abstract deleteAccount(id: string): Promise<AccountEntity>;
}
