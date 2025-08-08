import { JwtAdapter } from "../../config";
import { Request, Response } from "express";
import { RegisterUserDto, LoginUserDto, AuthRepository, CustomError } from "../../domain";

export class AuthController {

  constructor(
    private readonly authRepository: AuthRepository
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  registerUser = (req: Request, res: Response) => {
    const [error, userRegisterDTO] = RegisterUserDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    this.authRepository.registerUser(userRegisterDTO!)
      .then(async (user) => {
        res.json({
          user
        });
      })
      .catch(err => this.handleError(err, res));

  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDTO] = LoginUserDto.login(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    this.authRepository.loginUser(loginUserDTO!)
      .then(async (user) => {
        res.json({
          user,
          token: await JwtAdapter.generateToken({
            id: user.id,
            email: user.email,
          })
        });
      })
      .catch(err => this.handleError(err, res));
  }

} 
