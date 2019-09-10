import { Connection } from 'typeorm';
import { Loader } from './loader';

export const createContext = (connection: Connection) => ({
  connection,
  loader: new Loader(connection),
});

export type Context = ReturnType<typeof createContext>;
