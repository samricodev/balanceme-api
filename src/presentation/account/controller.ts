import { Request, Response } from 'express';
import {
  AccountRepository,
  CustomError,
  RegisterAccountDto,
  RegisterAccount
} from '../../domain';

export class AccountController {
  constructor(
    private readonly accountRepository: AccountRepository
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  registerAccount = (req: Request, res: Response) => {
    const [error, accountRegisterDTO] = RegisterAccountDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new RegisterAccount(this.accountRepository)
      .execute(accountRegisterDTO!)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => this.handleError(err, res));
  }
}