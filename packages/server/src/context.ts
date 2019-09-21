import { Connection } from 'typeorm';

export const createContext = (connection: Connection) => ({
  connection,
});

export type Context = ReturnType<typeof createContext>;
