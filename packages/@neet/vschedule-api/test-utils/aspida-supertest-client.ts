/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AspidaClient,
  AspidaParams,
  HttpMethod,
  RequestType,
} from 'aspida';
import supertest, { Response } from 'supertest';

const panic: any = () => {
  throw new Error('unimplemented');
};

export const aspidaSupertestClient = <C>(
  supertest: supertest.SuperTest<supertest.Test>,
) =>
  ({
    baseURL: '',
    fetch: (
      _prefix: string,
      path: string,
      rawMethod: HttpMethod,
      params?: AspidaParams<C> | undefined,
      _type?: RequestType | undefined,
    ) => {
      const send =
        <V>(map: (res: Response) => V) =>
        async () => {
          const method = rawMethod.toLowerCase() as Lowercase<HttpMethod>;

          if (params?.query != null) {
            path += '?' + new URLSearchParams(params.query).toString();
          }
          const req = supertest[method](path);

          if (params?.body != null) {
            req.send(params.body);
          }

          if (params?.headers != null) {
            req.set(params.headers);
          }

          const res = await req;

          if (!res.ok) {
            throw res;
          }

          return {
            status: res.status as V,
            headers: res.headers,
            originalResponse: res.text,
            body: map(res),
          };
        };

      return {
        send: send((v) => v),
        json: send((v) => v.body),
        text: send((v) => v.text),
        arrayBuffer: panic,
        blob: panic,
        formData: panic,
      };
    },
  } as any as AspidaClient<C>);
