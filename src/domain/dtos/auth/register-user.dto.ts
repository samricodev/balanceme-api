import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) { }

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {

    const { name, email, password } = object;

    if (!name) return ['Missing name'];
    if (!email) return ['Missing email'];
    if (!password) return ['Missing password'];

    if (!Validators.name.test(name)) {
      return ['Invalid name format'];
    }

    if (!Validators.email.test(email)) {
      return ['Invalid email format'];
    }

    if (!Validators.password.test(password)) {
      return ['Invalid password format'];
    }

    return [
      '',
      new RegisterUserDto(
        name,
        email,
        password
      )
    ];
  }
}