import { Request, Response } from "express";
import { RegisterUserDto, AuthRepository } from "../../domain";

export class AuthController {

  constructor(
    private readonly authRepository: AuthRepository
  ) { }

  registerUser = (req: Request, res: Response) => {
    const [error, userRegisterDTO] = RegisterUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    this.authRepository.registerUser(userRegisterDTO!)
      .then(user => res.json(user))
      .catch(err => {
        res.status(510).json({ error: err.message })
        console.log(err);
      });

  }

  loginUser = (req: Request, res: Response) => {

  }

} 