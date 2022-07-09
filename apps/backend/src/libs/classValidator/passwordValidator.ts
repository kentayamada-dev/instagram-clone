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
  private readonly strongPasswordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{10,})/u;

  private isValid = false;
  private readonly defaultErrorMessage = "Something went wrong";

  public validate(text: string): boolean {
    this.isValid = this.strongPasswordRegEx.test(text);

    return this.isValid;
  }

  public defaultMessage(): string {
    return this.defaultErrorMessage;
  }
}
