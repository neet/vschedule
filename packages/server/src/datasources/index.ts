import { ItsukaraLinkAPI } from './itsukara-link';
import { RESOURCE_HOST, RESOURCE_PROTOCOL } from '../config';

export const dataSources = () => ({
  itsukaraLink: new ItsukaraLinkAPI(`${RESOURCE_PROTOCOL}://${RESOURCE_HOST}`),
});
