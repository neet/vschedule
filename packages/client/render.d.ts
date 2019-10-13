import i18next from 'i18next';
export interface RenderParams {
  /** i18next instance */
  i18n: i18next.i18n;
  /** Request pathname */
  location: string;
  /** Built files manifest */
  manifest: {
    [K: string]: string;
  };
}
export interface RenderResult {
  statusCode: number;
  staticMarkup: string;
}
export declare const render: (params: RenderParams) => Promise<RenderResult>;
