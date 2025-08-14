import { AccountDataSource, AccountEntity } from "../../";

export class GetAccounts {
  constructor(private accountDataSource: AccountDataSource) { }

  async execute(userId: string): Promise<AccountEntity[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }
    return this.accountDataSource.getAccounts(userId);
  }
}