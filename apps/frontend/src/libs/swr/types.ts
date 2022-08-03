import type { ReactNode } from "react";
import type { Key } from "swr";

type GetKeyReturnType<VariablesType> = [key: Key, variables: VariablesType] | null;

export type GetKeyType<PreviousPageDataType, VariablesType> = (
  index: number,
  previousPageData: PreviousPageDataType | null
) => GetKeyReturnType<VariablesType>;

type SWRProviderProps = {
  children: ReactNode;
};

export type SWRProviderType = (props: SWRProviderProps) => JSX.Element;
