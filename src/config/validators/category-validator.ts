
export class CategoryValidators {
  static get categoryName() {
    return /^[a-zA-ZÀ-ÿ0-9\s]{3,50}$/; // 3 to 50 characters, alphanumeric and spaces, including accented characters
  }

  static get categoryType() {
    return /^(income|expense|Income|Expense)$/i; // Only 'income' or 'expense', case insensitive
  }

  static get icon() {
    return /^[a-zA-Z0-9\s]{2,}$/; // At least 2 characters, only letters, numbers and spaces
  }

  static get transactionCount() {
    return /^\d*$/; // Must be a number includes 0
  }

  static get totalAmount() {
    return /^-?\d+(\.\d{1,2})?$/; // Numeric value, can be negative, up to 2 decimal places
  }
}