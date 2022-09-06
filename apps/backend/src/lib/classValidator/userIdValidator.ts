import { ValidatorConstraint } from "class-validator";
import type { ValidatorConstraintInterface } from "class-validator";

// https://regexr.com/3cg7r
@ValidatorConstraint({ async: false, name: "userIdValidator" })
export class UserIdValidator implements ValidatorConstraintInterface {
  private readonly validUserIdRegEx = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/u;

  private isValid = false;
  private readonly defaultErrorMessage = "Something went wrong";

  public validate(text: string): boolean {
    this.isValid = this.validUserIdRegEx.test(text);

    return this.isValid;
  }

  public defaultMessage(): string {
    return this.defaultErrorMessage;
  }
}
