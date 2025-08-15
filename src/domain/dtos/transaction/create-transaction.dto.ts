import { TransactionValidators } from "../../../config";

export class CreateTransactionDto {
  constructor(
    public userId: string,
    public accountId: string,
    public categoryId: string,
    public amount: number,
    public type: string,
    public note: string,
    public date: Date,
  ) { }

  static create(object: { [key: string]: any; }): [string?, CreateTransactionDto?] {
    const { accountId, userId, categoryId, amount, type, note } = object;

    if (!accountId) return ['Missing accountId'];
    if (typeof amount !== 'number') return ['Invalid amount'];
    if (!type) return ['Missing type'];
    if (!note) return ['Missing description'];

    if (!TransactionValidators.transactionType.test(type)) return ['Invalid transaction type'];
    if (!TransactionValidators.amount.test(amount.toString())) return ['Invalid amount format'];
    if (!TransactionValidators.note.test(note)) return ['Invalid description format'];

    return [
      '',
      new CreateTransactionDto(
        accountId,
        categoryId,
        userId,
        amount,
        type,
        note, 
        new Date()
      )
    ];
  }
}