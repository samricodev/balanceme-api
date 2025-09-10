import { AccountRepository, UpdateAccountDto, CustomError } from '../../';

interface AccountUpdated {
  id: string;
  userId: string;
  name: string;
  type: string;
  currency: string;
  balance: number;
  updatedAt: Date;
}

export class UpdateAccount {
  constructor(private accountRepository: AccountRepository) { }

  async execute(id: string, updateAccountDTO: UpdateAccountDto): Promise<AccountUpdated> {

    const account = await this.accountRepository.updateAccount(id, updateAccountDTO);
    if (!account) {
      throw CustomError.internalServerError('Failed to update account');
    }
    
    return {
      id: account.id,
      userId: account.userId,
      name: account.name,
      type: account.type,
      currency: account.currency,
      balance: account.balance,
      updatedAt: account.updatedAt
    };
  }
}