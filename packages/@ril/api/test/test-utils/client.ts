/* eslint-disable @typescript-eslint/no-explicit-any */
// https://github.com/Himenon/openapi-typescript-code-generator/blob/main/example/sample-superagent.ts
import {
  ApiClient,
  Client,
  HttpMethod,
  ObjectLike,
  QueryParameters,
  SuccessResponses,
} from '@ril/api-client';
import supertest from 'supertest';

import { app } from '../../src/infra/app';
import { generateQueryString } from './generateQueryString';

class Requester<RequestOption> implements ApiClient<RequestOption> {
  public constructor(
    private readonly _request: supertest.SuperTest<supertest.Test>,
  ) {}

  request<T = SuccessResponses>(
    httpMethod: HttpMethod,
    url: string,
    headers: ObjectLike | any,
    requestBody: ObjectLike | any,
    queryParameters: QueryParameters | undefined,
    _options?: RequestOption,
  ): Promise<T> {
    const query = generateQueryString(queryParameters);
    const requestUrl = query ? url + '?' + encodeURI(query) : url;
    const method = httpMethod.toLowerCase() as Lowercase<HttpMethod>;
    const test = this._request[method](requestUrl);

    if (headers != null) {
      test.set(headers);
    }

    if (requestBody != null) {
      test.send(requestBody);
    }

    // if (options) {
    //   options.retries && request.retry(options.retries);
    //   if (
    //     (options.timeout && options.timeout > 0) ||
    //     (options.deadline && options.deadline > 0)
    //   ) {
    //     request.timeout({
    //       response: options.timeout,
    //       deadline: options.deadline,
    //     });
    //   }
    // }

    return new Promise((resolve, reject) => {
      test.end((error, response) => {
        if (error) {
          reject(error);
        }
        // MODIFIED: Throw when status != 2XX
        if (!response.ok) {
          reject(response.body);
        }
        resolve(response.body);
      });
    });
  }
}

export const request = supertest(app);
export const client = new Client(new Requester(request), '');
