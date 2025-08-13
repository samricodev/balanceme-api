import { Request, Response } from "express";
import {
  RegisterUserDto,
  LoginUserDto,
  UpdateUserDto,
  AuthRepository,
  CustomError,
  RegisterUser,
  LoginUser,
  DeleteUser,
  GetMe,
  UpdateUser,
  ReadUsers,
} from "../../domain";


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

    new GetMe(this.authRepository)
      .execute(userId)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => this.handleError(err, res));
  }

  updateMe = (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const [error, updateUserDTO] = UpdateUserDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    new UpdateUser(this.authRepository)
      .execute(userId, updateUserDTO!)
      .then(userUpdated => {
        res.status(200).json(userUpdated);
      })
      .catch(err => this.handleError(err, res));
  }

  deleteMe = (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    new DeleteUser(this.authRepository)
      .execute(userId)
      .then((userDeleted) => {
        res.status(200).json(userDeleted);
      })
      .catch(err => this.handleError(err, res));
  }


  getUsers = (req: Request, res: Response) => {
    new ReadUsers(this.authRepository)
      .execute()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => this.handleError(err, res));
  }
  
} 
