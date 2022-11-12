/* eslint-disable @typescript-eslint/no-explicit-any */
// https://github.com/Himenon/openapi-typescript-code-generator/blob/main/example/sample-superagent.ts
import {
  ApiClient,
  Client,
  HttpMethod,
  ObjectLike,
  QueryParameters,
  SuccessResponses,
} from '@neet/vschedule-api-client';
import supertest from 'supertest';

import { createApp } from '../../src/infra/app';
import { container } from '../inversify-config';
import { generateQueryString } from './generateQueryString';

interface RequestOption {
  readonly headers?: ObjectLike;
}

class Requester implements ApiClient<RequestOption> {
  public constructor(
    private readonly _request: supertest.SuperTest<supertest.Test>,
  ) {}

  request<T = SuccessResponses>(
    httpMethod: HttpMethod,
    url: string,
    headers: ObjectLike | any,
    requestBody: ObjectLike | any,
    queryParameters: QueryParameters | undefined,
    options: RequestOption = {},
  ): Promise<T> {
    const query = generateQueryString(queryParameters);
    const requestUrl = query ? url + '?' + encodeURI(query) : url;
    const method = httpMethod.toLowerCase() as Lowercase<HttpMethod>;
    const test = this._request[method](requestUrl);

    if (headers != null) {
      test.set(headers);
    }
    if (options.headers != null) {
      test.set(options.headers);
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
          reject(response);
        }
        resolve(response.body);
      });
    });
  }
}

export const createRequest = () => {
  const request = supertest(createApp(container));
  const client = new Client(new Requester(request), '');
  return { request, client };
};
