import { Request, Response } from "express";
import {
  RegisterUserDto,
  LoginUserDto,
  AuthRepository,
  CustomError,
  RegisterUser,
  LoginUser,
  DeleteUserUseCase
} from "../../domain";
import { ReadUsersUseCase } from "../../domain/use-cases/auth/read-users.use-case";
import { GetMeUseCase } from "../../domain/use-cases/auth/get-me.use-case";

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
        res.status(201).json(data);
      })
      .catch(err => this.handleError(err, res));
  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDTO] = LoginUserDto.login(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    new LoginUser(this.authRepository)
      .execute(loginUserDTO!)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => this.handleError(err, res));

  }

  getMe = (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    new GetMeUseCase(this.authRepository)
      .execute(userId)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => this.handleError(err, res));
  }

  deleteMe = (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    new DeleteUserUseCase(this.authRepository)
      .execute(userId)
      .then((userDeleted) => {
        res.status(200).json(userDeleted);
      })
      .catch(err => this.handleError(err, res));
  }


  getUsers = (req: Request, res: Response) => {
    new ReadUsersUseCase(this.authRepository)
      .execute()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => this.handleError(err, res));
  }

} 
