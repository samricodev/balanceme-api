export class AccountEntity {
  constructor(
    public id: string,
    public userId: string,
    public name: string,
    public type: string,
    public currency: string,
    public balance: number,
    public createdAt: Date,
    public updatedAt: Date
  ) { }
}