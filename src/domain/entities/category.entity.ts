export class CategoryEntity {
  constructor(
    public id: string,
    public name: string,
    public userId: string,
    public type: string,
    public description?: string,
  ) {}
}