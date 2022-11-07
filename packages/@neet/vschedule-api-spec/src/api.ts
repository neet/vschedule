/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-require-imports */
import fs from 'node:fs';
import path from 'node:path';

import {
  extendZodWithOpenApi,
  OpenAPIGenerator,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';
import glob from 'glob';
import { z } from 'zod';

// --- 1. Initialize zod ---
extendZodWithOpenApi(z);
const registry = new OpenAPIRegistry();
export { registry };

// --- 2. Load modules ---
const pattern = path.join(__dirname, './**/*.js');
const modules = glob.sync(pattern);
for (const module of modules) {
  require(module);
}

// --- 3. Generate document ---
const document = new OpenAPIGenerator(registry.definitions).generateDocument({
  openapi: '3.0.1',
  info: {
    title: 'Refined Itsukara.link',
    version: JSON.parse(
      fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'),
    ).version,
    description: 'VSchedule Public API Definition',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development environment',
    },
  ],
});

// --- 4. Stdout result ---
console.log(JSON.stringify(document, null, 2));
