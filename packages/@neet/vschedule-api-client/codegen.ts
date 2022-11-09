// https://github.com/Himenon/openapi-typescript-code-generator#generate-code-containing-the-api-client
import * as fs from 'fs';

import { CodeGenerator } from '@himenon/openapi-typescript-code-generator';
import * as Templates from '@himenon/openapi-typescript-code-generator/templates';
import type * as Types from '@himenon/openapi-typescript-code-generator/types';

const main = () => {
  const codeGenerator = new CodeGenerator(
    require.resolve('@neet/vschedule-api-spec/openapi'),
  );

  const apiClientGeneratorTemplate: Types.CodeGenerator.CustomGenerator<Templates.ApiClient.Option> =
    {
      generator: Templates.ApiClient.generator,
      option: {},
    };

  const code = codeGenerator.generateTypeDefinition([
    codeGenerator.getAdditionalTypeDefinitionCustomCodeGenerator(),
    apiClientGeneratorTemplate,
  ]);

  fs.writeFileSync('./src/index.ts', code, { encoding: 'utf-8' });
};

main();
