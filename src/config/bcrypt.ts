import { compareSync, hashSync } from 'bcryptjs';

export class BcryptAdapter {
  static hash(value: string): string {
    return hashSync(value);
  }

  static compare(value: string, hash: string): boolean {
    return compareSync(value, hash);
  }
}
