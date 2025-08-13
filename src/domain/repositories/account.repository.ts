import { AccountEntity, RegisterAccountDto } from '../';

export abstract class AccountRepository {
  abstract registerAccount(registerAccountDTO: RegisterAccountDto): Promise<AccountEntity>;
}