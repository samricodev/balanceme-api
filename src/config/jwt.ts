import jwt, { SignOptions } from 'jsonwebtoken';

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: SignOptions['expiresIn'] = '1h'
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, 'SEED', { expiresIn: duration }, (err, token) => {
        if (err) {
          return resolve(null);
        }
        resolve(token!);
      });
    });
  }
}
