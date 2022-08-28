import type { MapObjectPropertyToBoolean } from "../../types";
import type { Prisma } from "@prisma/client";

export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isObjectEmpty(obj: {}): boolean {
  return !Object.keys(obj).length;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function extractUserProperties(obj: any = {}): MapObjectPropertyToBoolean<Prisma.UserSelect> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { likes: _likes, posts: _posts, follower: _follower, following: _following, ...properties } = obj;

  return properties as MapObjectPropertyToBoolean<Prisma.UserSelect>;
}
