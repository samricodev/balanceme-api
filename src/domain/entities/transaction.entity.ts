export class TransactionEntity {
  constructor(
    public id: string,
    public userId: string,
    public accountId: string,
    public categoryId: string,
    public amount: number,
    public type: string,
    public note: string,
    public date: Date = new Date()
  ) { }
}