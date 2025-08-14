
export class CategoryValidators {
  static get categoryName() {
    return /^[a-zA-Z0-9\s]{3,50}$/; // Alphanumeric and spaces, 3 to 50 characters
  }

  static get categoryType() {
    return /^(income|expense)$/; // Only 'income' or 'expense'
  }
}