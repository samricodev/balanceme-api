import { CategoryValidators } from "../../../config";

export class UpdateCategoryDto {
  constructor(
    public userId: string,
    public name: string,
    public type: string,
    public icon: string,
    public color: string,
    public description?: string
  ) { }

  static create(object: { [key: string]: any; }): [string?, UpdateCategoryDto?] {
    const { userId, name, type, icon, color, description } = object;

    if (!userId) return ['Missing userId'];
    if (!name) return ['Missing name'];
    if (!type) return ['Missing type'];
    if (!icon) return ['Missing icon'];
    if (!color) return ['Missing color'];

    if (!CategoryValidators.categoryName.test(name)) return ['Invalid name'];
    if (!CategoryValidators.categoryType.test(type)) return ['Invalid type'];

    return [
      '',
      new UpdateCategoryDto(
        userId,
        name,
        type,
        icon,
        color,
        description
      )
    ];
  }
}