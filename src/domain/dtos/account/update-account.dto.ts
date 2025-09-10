import { accountValidators } from "../../../config";

export class UpdateAccountDto {
  constructor(
    public userId: string,
    public name: string,
    public type: string,
    public currency: string,
    public balance: number,
    public updatedAt: Date
  ) { }

  static create(object: { [key: string]: any; }): [string?, UpdateAccountDto?] {
    const { userId, name, type, currency, balance } = object;

    if (!userId) return ['Missing userId'];
    if (!name) return ['Missing name'];
    if (!type) return ['Missing type'];
    if (!currency) return ['Missing currency'];
    if (typeof balance !== 'number') return ['Invalid balance'];

    if (!accountValidators.accountName.test(name)) return ['Invalid name'];
    if (!accountValidators.accountType.test(type)) return ['Invalid type'];
    if (!accountValidators.currency.test(currency)) return ['Invalid currency'];
    if (!accountValidators.balance.test(balance.toString())) return ['Invalid balance'];

    return [
      '',
      new UpdateAccountDto(
        userId,
        name,
        type,
        currency,
        balance,
        new Date()
      )
    ];
  }
}