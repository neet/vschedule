import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const APP_HOST = process.env.APP_HOST as string;
export const APP_PORT = Number(process.env.APP_PORT as string);
export const RESOURCE_PROTOCOL = process.env.RESOURCE_PROTOCOL as string;
export const RESOURCE_HOST = process.env.RESOURCE_HOST as string;
