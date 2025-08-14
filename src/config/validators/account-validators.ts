export class accountValidators {
    
  static get accountName() {
    return /^[a-zA-Z0-9\s]{2,}$/; // At least 2 characters, only letters, numbers and spaces
  }

  static get accountType() {
    return /^(bank|cash|investment)$/; // Must be one of the predefined types
  }

  static get currency() {
    return /^(MXN|USD|EUR)$/; // Must be one of the predefined currencies
  }
  
  static get balance() {
    return /^-?\d+(\.\d{1,2})?$/; // Numeric value, can be negative, up to 2 decimal places
  }
}