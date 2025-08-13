import { AccountEntity } from "../../domain";

export class AccountMapper {
  static accountEntityFromObject(object: { [key: string]: any }): AccountEntity {
    const { _id, id, name, userId, type, currency, balance, createdAt, updatedAt } = object;

    if (!id && !_id) {
      throw new Error('Invalid account object: missing id or _id');
    }
    if (!name) {
      throw new Error('Invalid account object: missing name');
    }
    if (!userId) {
      throw new Error('Invalid account object: missing userId');
    }
    if (!type) {
      throw new Error('Invalid account object: missing type');
    }
    if (!currency) {
      throw new Error('Invalid account object: missing currency');
    }
    if (balance === undefined || balance === null) {
      throw new Error('Invalid account object: missing balance');
    }
    if (!createdAt) {
      throw new Error('Invalid account object: missing createdAt');
    }
    if (!updatedAt) {
      throw new Error('Invalid account object: missing updatedAt');
    }

    return new AccountEntity(
      _id || id,
      name,
      userId,
      type,
      currency,
      balance,
      createdAt,
      updatedAt
    );
  }
}