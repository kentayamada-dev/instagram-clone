import type { SignupInput } from "../../generated";
import type { FieldErrors, SubmitHandler, UseFormRegister, UseFormReturn } from "react-hook-form";

export type MyFormType = Omit<SignupInput, "imageUrl"> & {
  file: Blob | FileList;
};

type UseMyFormProps = {
  isSignup: boolean;
};

type UseMyFormReturnType = UseFormReturn<MyFormType> & {
  errorMessage: string;
  submitHandler: SubmitHandler<MyFormType>;
};

export type UseMyFormType = (props: UseMyFormProps) => UseMyFormReturnType;

export type FormInputProps = {
  errors: FieldErrors<MyFormType>;
  register: UseFormRegister<MyFormType>;
};
