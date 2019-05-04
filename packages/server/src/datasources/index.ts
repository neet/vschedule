import { ItsukaraLinkAPI } from './itsukara-link';
import { RESOURCE_URI } from '../config';

export const dataSources = () => ({
  itsukaraLink: new ItsukaraLinkAPI(RESOURCE_URI),
});
