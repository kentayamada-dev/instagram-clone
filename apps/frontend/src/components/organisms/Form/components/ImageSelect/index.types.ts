import type { FormDtoType, FormInputProps } from "../../index.types";
import type {
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue
} from "react-hook-form";

type ImageSelectProps = FormInputProps & {
  clearErrors: UseFormClearErrors<FormDtoType>;
  setError: UseFormSetError<FormDtoType>;
  setValue: UseFormSetValue<FormDtoType>;
};

export type ImageSelectType = (props: ImageSelectProps) => JSX.Element;
