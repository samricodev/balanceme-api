export class CategoryEntity {
  constructor(
    public id: string,
    public name: string,
    public userId: string,
    public type: string,
    public icon: string,
    public totalAmount: number,
    public transactionCount: number,
    public description?: string,
  ) {}
}