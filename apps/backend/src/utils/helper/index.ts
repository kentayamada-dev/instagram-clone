export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isObjectEmpty(obj: {}): boolean {
  return !Object.keys(obj).length;
}
