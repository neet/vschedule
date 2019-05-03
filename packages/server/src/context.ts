import { dataSources } from './datasources';

export interface Context {
  dataSources: ReturnType<typeof dataSources>;
}
