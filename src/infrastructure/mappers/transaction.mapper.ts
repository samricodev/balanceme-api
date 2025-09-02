import { TransactionEntity } from "../../domain";

export class TransactionMapper {
  static transactionEntityFromObject(object: { [key: string]: any }): TransactionEntity {
    const { _id, id, userId, accountId, categoryId, amount, type, note, date } = object;

    if (!id && !_id) {
      throw new Error('Invalid transaction object: missing id or _id');
    }
    if (!userId) {
      throw new Error('Invalid transaction object: missing userId');
    }
    if (!accountId) {
      throw new Error('Invalid transaction object: missing accountId');
    }
    if (!categoryId) {
      throw new Error('Invalid transaction object: missing categoryId');
    }
    if (amount === undefined || amount === null) {
      throw new Error('Invalid transaction object: missing amount');
    }
    if (!type) {
      throw new Error('Invalid transaction object: missing type');
    }
    if (note === undefined || note === null) {
      throw new Error('Invalid transaction object: missing note');
    }
    if (!date) {
      throw new Error('Invalid transaction object: missing date');
    }

    return new TransactionEntity(
      _id || id,
      userId,
      accountId,
      categoryId,
      amount,
      type,
      note,
      date
    );
  }
}