/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { ApolloClient, type NormalizedCacheObject, HttpLink, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import React from "react";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

// eslint-disable-next-line @typescript-eslint/init-declarations
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Query: {
          fields: {
            getAllPosts: relayStylePagination()
          }
        }
      }
    }),
    link: new HttpLink({
      credentials: "include",
      uri: process.env["NEXT_PUBLIC_INSTAGRAM_CLONE_API_URL"] ?? ""
    }),
    ssrMode: typeof window === "undefined"
  });

export const initializeApollo = (initialState: any = null): ApolloClient<NormalizedCacheObject> => {
  const client: ApolloClient<NormalizedCacheObject> = apolloClient ?? createApolloClient();

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const data = merge(existingCache, initialState, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(
          (destination) => sourceArray.every((source) => !isEqual(destination, source))
          // eslint-disable-next-line function-paren-newline
        )
      ]
    });
    client.cache.restore(data);
  }
  if (typeof window === "undefined") {
    return client;
  }
  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
};

export const addApolloState = (client: ApolloClient<NormalizedCacheObject>, pageProps: any): any => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export const useApollo = (pageProps: any): ApolloClient<NormalizedCacheObject> => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = React.useMemo(() => initializeApollo(state), [state]);

  return store;
};

/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
