import type { FormInputProps, MyFormType } from "../../../../../hooks/useForm/type";
import type { UseFormClearErrors, UseFormSetError, UseFormSetValue } from "react-hook-form";

type ImageSelectProps = FormInputProps & {
  clearErrors: UseFormClearErrors<MyFormType>;
  setError: UseFormSetError<MyFormType>;
  setValue: UseFormSetValue<MyFormType>;
};

export type ImageSelectType = (props: ImageSelectProps) => JSX.Element;
