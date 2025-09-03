
export class TransactionValidators {
  static get transactionType(){
    return /^(income|expense|saving|investment)$/; // Only 'income', 'expense', 'saving', or 'investment'
  }

  static get amount() {
    return /^\d+(\.\d{1,2})?$/; // Positive number with up to two decimal places
  }

  static get note() {
    return /^.{0,255}$/; // Up to 255 characters
  }
}