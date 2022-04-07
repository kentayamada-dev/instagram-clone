import type {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  UseFormReturn
} from "react-hook-form";

export type MyFormType = {
  email: string;
  password: string;
  name: string;
  file: Blob | FileList;
};

type UseMyFormProps = {
  isSignup: boolean;
};

export type UseMyFormType = (
  props: UseMyFormProps
) => UseFormReturn<MyFormType> & {
  submitHandler: SubmitHandler<MyFormType>;
  errorMessage: string;
};

export type FormInputProps = {
  register: UseFormRegister<MyFormType>;
  errors: FieldErrors<MyFormType>;
};
