export class userValidators {

  static get name() {
    return /^[a-zA-Z\s]{2,}$/; // At least 2 characters, only letters and spaces
  }

  static get email(){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
  }

  static get password() {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one uppercase, one lowercase, one number
  }
}
