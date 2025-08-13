import { Validators } from "../../../config";

export class UpdateUserDto {
  private constructor(
    public name?: string,
    public email?: string,
    public password?: string
  ) { }

  static create(object: { [key: string]: any; }): [string?, UpdateUserDto?] {

    const { name, email, password } = object;

    if (!name && !email && !password) {
      return ['At least one field must be provided'];
    }

    if (name && !Validators.name.test(name)) {
      return ['Invalid name format'];
    }

    if (email && !Validators.email.test(email)) {
      return ['Invalid email format'];
    }

    if (password && !Validators.password.test(password)) {
      return ['Invalid password format'];
    }

    return [
      '',
      new UpdateUserDto(
        name,
        email,
        password
      )
    ];
  }
}