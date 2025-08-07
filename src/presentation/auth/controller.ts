import { Request,Response } from "express";

export class AuthController {

  constructor () {}

  registerUser = (req: Request, res: Response) => {
    res.send('Register endpoint from controller');
  }

  loginUser = (req: Request, res: Response) => {
    res.send('Login endpoint from controller');
  }

}