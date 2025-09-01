import { CategoryValidators } from "../../../config";

export class CreateCategoryDto {
  constructor(
    public userId: string,
    public name: string,
    public type: string,
    public icon: string,
    public transactionCount: number,
    public totalAmount: number,
    public description?: string
  ) { }

  static create(object: { [key: string]: any; }): [string?, CreateCategoryDto?] {
    const { userId, name, type, icon, transactionCount, totalAmount, description } = object;

    if (!userId) return ['Missing userId'];
    if (!name) return ['Missing name'];
    if (!type) return ['Missing type'];
    if (!icon) return ['Missing icon'];
    if (transactionCount === undefined || transactionCount === null) return ['Missing transactionCount'];
    if (totalAmount === undefined || totalAmount === null) return ['Missing totalAmount'];

    if (!CategoryValidators.categoryName.test(name)) return ['Invalid name'];
    if (!CategoryValidators.categoryType.test(type)) return ['Invalid type'];
    if (!CategoryValidators.icon.test(icon)) return ['Invalid icon'];
    if (!CategoryValidators.transactionCount.test(transactionCount.toString())) return ['Invalid transactionCount'];
    if (!CategoryValidators.totalAmount.test(totalAmount.toString())) return ['Invalid totalAmount'];

    return [
      '',
      new CreateCategoryDto(
        name,
        userId,
        type,
        icon,
        transactionCount,
        totalAmount,
        description
      )
    ];
  }
}