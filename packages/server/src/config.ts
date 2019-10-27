import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const PUBLIC_URL = process.env.PUBLIC_URL as string;
export const BIND_PORT = Number(process.env.BIND_PORT as string);

export const ES_HOST = process.env.ES_HOST as string;
export const ES_PORT = process.env.ES_PORT as string;
export const ES_PREFIX = process.env.ES_PREFIX as string;

export const RESOURCE_PROTOCOL = process.env.RESOURCE_PROTOCOL as string;
export const RESOURCE_HOST = process.env.RESOURCE_HOST as string;
export const RESOURCE_URL = `${RESOURCE_PROTOCOL}://${RESOURCE_HOST}`;
