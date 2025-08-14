import { AccountDataSource, AccountEntity } from "../../";

export class DeleteAccount {
  constructor(private accountDataSource: AccountDataSource) {}
  async execute(id: string): Promise<AccountEntity> {
    if (!id) {
      throw new Error('Account ID is required');
    }
    return this.accountDataSource.deleteAccount(id);
  }
}