import { Request,Response } from "express";
import { RegisterUserDto } from "../../domain";

export class AuthController {

  constructor () {}

  registerUser = (req: Request, res: Response) => {
    const [error, userRegisterDTO] = RegisterUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(201).json({
      message: "User registered successfully",
      user: userRegisterDTO
    });
  }

  loginUser = (req: Request, res: Response) => {

  }

} 