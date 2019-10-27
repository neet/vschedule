import { PartialDeep } from 'type-fest';

export type Serialized<T, U extends keyof T> = Omit<T, U> &
  PartialDeep<Pick<T, U>>;
