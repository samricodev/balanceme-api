import { AccountRepository, RegisterAccountDto, CustomError} from '../../';

interface AccountCreated {
  id: string;
  userId: string;
  name: string;
  type: string;
  currency: string;
  balance: number;
}

export class RegisterAccount {
  constructor(private accountRepository: AccountRepository) {}

  async execute(registerAccountDTO: RegisterAccountDto): Promise<AccountCreated> {

    const account = await this.accountRepository.registerAccount(registerAccountDTO);
    if (!account) {
      throw CustomError.internalServerError('Failed to create account');
    }

    return {
      id: account.id,
      userId: account.userId,
      name: account.name,
      type: account.type,
      currency: account.currency,
      balance: account.balance
    };
  }
}