import { AccountEntity, RegisterAccountDto } from '../';

export abstract class AccountDataSource {
  abstract registerAccount(registerAccountDTO: RegisterAccountDto): Promise<AccountEntity>;
}
