import type { Key } from "swr";

type GetKeyReturnType<VariablesType> = [key: Key, variables: VariablesType] | null;

export type GetKeyType<PreviousPageDataType, VariablesType> = (
  index: number,
  previousPageData: PreviousPageDataType | null
) => GetKeyReturnType<VariablesType>;
