import { AccountDataSource, AccountEntity} from '../../';

export class GetAccount {
  constructor(private accountDataSource: AccountDataSource) {}

  async execute(id: string): Promise<AccountEntity> {
    if (!id) {
      throw new Error('Account ID is required');
    }
    return this.accountDataSource.getAccountById(id);
  }
}