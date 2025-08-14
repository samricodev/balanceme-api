import { Request, Response } from 'express';
import {
  AccountRepository,
  CustomError,
  RegisterAccountDto,
  RegisterAccount,
  GetAccount,
  DeleteAccount
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

  getAccountById = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Account ID is required' });
    }

    new GetAccount(this.accountRepository)
      .execute(id)
      .then(account => {
        if (!account) {
          return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json(account);
      })
      .catch(err => this.handleError(err, res));
  }

  deleteAccount = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Account ID is required' });
    }

    new DeleteAccount(this.accountRepository)
      .execute(id)
      .then(deletedAccount => {
        if (!deletedAccount) {
          return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json(deletedAccount);
      })
      .catch(err => this.handleError(err, res));
    }
}