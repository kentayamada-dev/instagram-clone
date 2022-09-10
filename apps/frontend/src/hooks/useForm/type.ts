import type { SignupInput } from "../../generated";
import type { FieldErrors, SubmitHandler, UseFormRegister, UseFormReturn } from "react-hook-form";

export type MyFormType = Omit<SignupInput, "imageUrl"> & {
  file: Blob | FileList;
};

export type LoginFormType = Pick<MyFormType, "email" | "password">;

type UseMyFormReturnType = UseFormReturn<MyFormType> & {
  errorMessage: string;
  loginHandler: SubmitHandler<LoginFormType>;
  signupHandler: SubmitHandler<MyFormType>;
};

export type UseMyFormType = () => UseMyFormReturnType;

export type FormInputProps = {
  errors: FieldErrors<MyFormType>;
  register: UseFormRegister<MyFormType>;
};
