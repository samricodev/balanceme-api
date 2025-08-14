import { accountValidators } from "../../../config";

export class RegisterAccountDto {
  constructor(
    public userId: string,
    public name: string,
    public type: string,
    public currency: string,
    public balance: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  static create(object: { [key: string]: any; }): [string?, RegisterAccountDto?] {
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
      new RegisterAccountDto(
        userId,
        name,
        type,
        currency,
        balance,
        new Date(),
        new Date()
      )
    ];
  }
}