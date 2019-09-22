declare module '@ril/client' {
  import i18next from 'i18next';

  export interface SSRParams {
    /** i18next instance */
    i18n: i18next.i18n;
    /** Request pathname */
    location: string;
    /** Built files manifest */
    manifest: { [K: string]: string } | any;
  }

  export interface SSRResult {
    statusCode: number;
    staticMarkup: string;
  }

  export default function SSR(params: SSRParams): Promise<SSRResult>;
}
