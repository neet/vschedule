export interface TestDb {
  readonly uri: string;
  readonly name: string;
  readonly shouldCreate: boolean;
}

export const getTestDbConfig = (originalUri: string): TestDb => {
  const uriObj = new URL(originalUri as string);
  const shouldCreate = !uriObj.pathname.includes('test');

  if (shouldCreate) {
    uriObj.pathname = uriObj.pathname + '_test';
  }

  const uri = uriObj.toString();
  const name = uriObj.pathname.replace(/^\//, '');

  return { uri, name, shouldCreate };
};
