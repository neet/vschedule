/* eslint-disable @typescript-eslint/naming-convention */
import type { Dayjs } from 'dayjs';

import type { Entity } from './Entity';
import type { ValueObject, ValueOf } from './ValueObject';

type Primitive = bigint | boolean | number | string | symbol | null | undefined;
type Function_ = (...arguments_: readonly unknown[]) => unknown;
type Builtin = Date | Dayjs | Error | Function_ | Primitive | RegExp;

export type PrimitiveOf<T> = { [key in keyof T]: ValueOf<T[key]> };

// prettier-ignore
export type DeepPrimitiveOf<T, PrimitiveType = Builtin> =(
	/* Primitive */
  T extends PrimitiveType
  ? T

  /* Entity */
  : T extends Entity<ValueObject, infer R>
  ? PrimitiveOf<R>

  /* ValueObject */
  : T extends ValueObject<infer R>
  ? R

  /* otherwise */
  : { [key in keyof T]: DeepPrimitiveOf<T[key], PrimitiveType> }
);
