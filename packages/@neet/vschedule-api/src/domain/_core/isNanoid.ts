export const isNanoid = (value: unknown, size = 21): value is string =>
  typeof value === 'string' &&
  /^[A-Za-z0-9_-]+$/.test(value) &&
  value.length === size;
