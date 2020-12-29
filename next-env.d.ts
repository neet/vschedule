/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly GA_MEASUREMENT_ID?: string;
  }
}
