import { JwtAdapter } from "../../config";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../data/mongodb";

export class AuthMiddleware {
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({ error: 'No token provided' });
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.verifyToken<{ id: string; email: string }>(token);
      if (!payload) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const user = await UserModel.findById(payload.id);
      if (!user) {
        return res.status(401).json({ error: 'Invalid token - User not found' });
      }

      next();
    } catch (error) {
      console.error('JWT validation error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}