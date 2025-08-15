import { CategoryValidators } from "../../../config";

export class CreateCategoryDto {
  constructor(
    public name: string,
    public userId: string,
    public type: string,
    public description?: string
  ) { }

  static create(object: { [key: string]: any; }): [string?, CreateCategoryDto?] {
    const { userId, name, type, description } = object;

    if (!userId) return ['Missing userId'];
    if (!name) return ['Missing name'];
    if (!type) return ['Missing type'];

    if (!CategoryValidators.categoryName.test(name)) return ['Invalid name'];
    if (!CategoryValidators.categoryType.test(type)) return ['Invalid type'];


    return [
      '',
      new CreateCategoryDto(
        name,
        userId,
        type,
        description
      )
    ];
  }
}