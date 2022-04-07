import type { ApiErrorResponseType } from "./types";

type ObjectType<T> = { [P in keyof T]?: unknown };

const isObject = <T extends Record<string, unknown>>(
  value: unknown
): value is ObjectType<T> => typeof value === "object" && value !== null;

export const isApiError = (error: unknown): error is ApiErrorResponseType =>
  isObject(error) && "response" in error;
