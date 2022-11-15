import { TypeOf, z } from 'zod';

export const configSchema = z.object({
  youtube: z.object({
    dataApiKey: z.string(),
    websubHmacSecret: z.string(),
    websubVerifyToken: z.string(),
  }),
  storage: z.object({
    type: z.union([z.literal('cloud-storage'), z.literal('filesystem')]),
    bucket: z.string(),
  }),
  server: z.object({
    port: z.number().int(),
    origin: z.string().url(),
  }),
  tasks: z.object({
    resources: z.object({
      resubscription: z.string(),
    }),
  }),
  logger: z.object({
    type: z.union([z.literal('console'), z.literal('cloud-logging')]),
  }),
  secrets: z.object({
    passwordSalt: z.string(),
  }),
  admin: z.object({
    emails: z.array(z.string()),
  }),
  session: z.object({
    store: z.union([z.literal('firestore'), z.literal('memory')]),
    secret: z.string(),
  }),
});

export type IAppConfig = TypeOf<typeof configSchema>;

// TODO: メソッドにしたい
const resolvePath = (config: IAppConfig, pathname: string) => {
  const origin = new URL(config.server.origin);
  origin.pathname = pathname;
  return origin.toString();
};

export const utils = {
  resolvePath,
};
