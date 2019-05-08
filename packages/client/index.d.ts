declare module '@ril/client' {
  export interface SSRParams {
    location: string;
    manifest: { [K: string]: string };
  }

  export default function SSR(params: SSRParams): string;
}
