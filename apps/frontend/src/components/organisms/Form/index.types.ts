import type { UseUserReturnType } from "../../../hooks/useUser/types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

export type FormProps = UseUserReturnType & {
  isSignup: boolean;
};

export type FormType = (props: FormProps) => JSX.Element;

export type FormDtoType = {
  email: string;
  password: string;
  name: string;
  file: Blob | FileList;
};

export type FormInputProps = {
  register: UseFormRegister<FormDtoType>;
  errors: FieldErrors<FormDtoType>;
};
