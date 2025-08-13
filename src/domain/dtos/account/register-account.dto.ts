
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

    if (typeof userId !== 'string' || userId.trim() === '') {
      return ['Invalid userId format'];
    }

    if (typeof name !== 'string' || name.trim() === '') {
      return ['Invalid name format'];
    }

    if (typeof type !== 'string' || type.trim() === '') {
      return ['Invalid type format'];
    }

    if (typeof currency !== 'string' || currency.trim() === '') {
      return ['Invalid currency format'];
    }

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