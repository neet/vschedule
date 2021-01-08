/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import fetch from 'isomorphic-unfetch';
import type { NextApiHandler } from 'next';

const livers: NextApiHandler = async (_req, res) => {
  const data = await fetch('https://api.itsukaralink.jp/v1.2/livers.json').then(
    async (r) => (await r.json()) as unknown,
  );

  res.json(data);
};

export default livers;