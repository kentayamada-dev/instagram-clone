export type FormProps = {
  isSignup: boolean;
};

export type FormType = (props: FormProps) => JSX.Element;

export type GetValueByAuthModeType = <SignupValueType, LoginValueType>(
  signupValue: SignupValueType,
  loginValue: LoginValueType
) => LoginValueType | SignupValueType;
