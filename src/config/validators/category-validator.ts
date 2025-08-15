
export class CategoryValidators {
  static get categoryName() {
    return /^[a-zA-ZÀ-ÿ0-9\s]{3,50}$/; // 3 to 50 characters, alphanumeric and spaces, including accented characters
  }

  static get categoryType() {
    return /^(income|expense|Income|Expense)$/i; // Only 'income' or 'expense', case insensitive
  }
}