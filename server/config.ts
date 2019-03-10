import * as dotenv from 'dotenv';

dotenv.config();

export const APP_PROTOCOL = process.env.APP_PROTOCOL as string;
export const APP_HOST = process.env.APP_HOST as string;
export const APP_PORT = Number(process.env.APP_PORT);

export const RESOURCE_PROTOCOL = process.env.RESOURCE_PROTOCOL as string;
export const RESOURCE_HOST = process.env.RESOURCE_HOST as string;
