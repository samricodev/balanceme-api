import { AccountModel } from "../../data/mongodb";
import { NextFunction, Request, Response } from "express";

export const balanceMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, accountId, amount, type } = req.body;

  if (type === 'expense') {
    const account = await AccountModel.findOne({ _id: accountId, userId });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    if (account.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds in account" });
    }
  }

  next();
};