/* eslint-disable @typescript-eslint/no-explicit-any */
type Lazy<T> = () => T;

export const catchAll = <T extends Record<string, Lazy<U> | U>, U>(
  record: T,
): Record<string, U> => {
  const result: Record<string, U> = {};
  const errors: Record<string, unknown> = {};

  for (const [key, lazy] of Object.entries(record)) {
    if (typeof lazy !== 'function') {
      result[key] = lazy;
      continue;
    }

    try {
      result[key] = (lazy as any)();
    } catch (error) {
      errors[key] = error;
    }
  }

  if (Object.keys(errors).length > 0) {
    throw errors;
  }

  return result;
};
