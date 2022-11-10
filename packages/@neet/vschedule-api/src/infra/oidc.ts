import { Provider } from 'oidc-provider';

import { IAppConfig } from '../app/services/AppConfig/AppConfig';
import { TYPES } from '../types';
import { container } from './inversify-config';

const config = container.get<IAppConfig>(TYPES.AppConfig);
const provider = new Provider(config.server.origin, {
  // http://localhost:3000/auth?client_id=ZMfxMP0NHeUlDG4Vnjxsh&response_type=id_token&redirect_uri=https://neet.love&scope=openid&nonce=foobar
  clients: [
    {
      client_id: 'ZMfxMP0NHeUlDG4Vnjxsh',
      // redirect_uris: ['urn:ietf:wg:oauth:2.0:oo'],
      redirect_uris: ['https://neet.love'],
      response_types: ['id_token'],
      grant_types: ['implicit'],
      token_endpoint_auth_method: 'none',
    },
  ],
  cookies: {
    keys: [''],
  },
  findAccount(...args) {
    console.log(args);
    return undefined;
  },
});

export { provider };
