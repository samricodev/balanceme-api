import { userValidators } from "../../../config";

export class UpdateUserDto {
  private constructor(
    public name?: string,
    public email?: string,
    public password?: string,
    public enableNotifications?: boolean,
    public enable2FA?: boolean,
    public automaticLimits?: boolean
  ) { }

  static create(object: { [key: string]: any; }): [string?, UpdateUserDto?] {

    const { name, email, password, enableNotifications, enable2FA, automaticLimits } = object;

    if (!name && !email && !password && enableNotifications === undefined && enable2FA === undefined && automaticLimits === undefined) {
      return ['At least one field must be provided'];
    }

    if (name && !userValidators.name.test(name)) {
      return ['Invalid name format'];
    }

    if (email && !userValidators.email.test(email)) {
      return ['Invalid email format'];
    }

    if (password && !userValidators.password.test(password)) {
      return ['Invalid password format'];
    }

    return [
      '',
      new UpdateUserDto(
        name,
        email,
        password,
        enableNotifications,
        enable2FA,
        automaticLimits
      )
    ];
  }
}