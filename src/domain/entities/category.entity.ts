export class CategoryEntity {
  constructor(
    public id: string,
    public userId: string,
    public name: string,
    public type: string,
    public icon: string,
    public transactionCount: number,
    public totalAmount: number,
    public description?: string,
  ) {}
}