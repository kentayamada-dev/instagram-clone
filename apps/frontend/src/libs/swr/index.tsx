import { SWRConfig } from "swr";
import { fetcher } from "../graphql_request";
import type { SWRProviderType } from "./types";

export const SWRProvider: SWRProviderType = ({ children }) => (
  <SWRConfig
    value={{
      fetcher,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false
    }}
  >
    {children}
  </SWRConfig>
);
