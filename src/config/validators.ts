export class Validators {

  static get name() {
    return /^[a-zA-Z\s]{2,}$/;
  }

  static get email(){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  }

  static get password() {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one uppercase, one lowercase, one number
  }
}