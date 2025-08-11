import { JwtAdapter } from "../../config";
import { Request, Response } from "express";
import { UserModel } from "../../data/mongodb";
import { RegisterUserDto, LoginUserDto, AuthRepository, CustomError, RegisterUser } from "../../domain";

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
    if (error) return res.status(400).json({ error });

    new RegisterUser(this.authRepository)
      .execute(userRegisterDTO!)
      .then(data => {
        res.status(201).json(data );
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

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then(users => {
        res.json({
          users
        });
      })
      .catch(err => this.handleError(err, res));
  }

} 
