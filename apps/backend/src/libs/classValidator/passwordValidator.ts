import { passwordStrength } from "check-password-strength";
import { ValidatorConstraint } from "class-validator";
import type { ValidatorConstraintInterface } from "class-validator";

/*
 *  Allowed Password
 * {
 *     "contains": ['lowercase', 'uppercase', 'symbol', 'number'],
 *     "min-length": greater than 10
 * }
 */
@ValidatorConstraint({ async: false, name: "passwordValidator" })
export class PasswordValidator implements ValidatorConstraintInterface {
  private result = "";
  private isValid = false;
  private readonly defaultErrorMessage = "Something went wrong";

  public validate(text: string): boolean {
    this.result = passwordStrength(text).value;
    this.isValid = !(this.result === "Weak" || this.result === "Too weak");

    return this.isValid;
  }

  public defaultMessage(): string {
    return this.defaultErrorMessage;
  }
}
