import { RESOURCE_HOST, RESOURCE_PROTOCOL } from 'src/config';
import { ItsukaraLinkAPI } from './itsukara-link';

export const dataSources = () => ({
  itsukaraLink: new ItsukaraLinkAPI(`${RESOURCE_PROTOCOL}://${RESOURCE_HOST}`),
});
