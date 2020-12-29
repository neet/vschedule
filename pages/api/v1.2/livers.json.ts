import fetch from 'isomorphic-unfetch';
import type { NextApiHandler } from 'next';

const livers: NextApiHandler = async (req, res) => {
  const data = await fetch(
    'https://api.itsukaralink.jp/v1.2/livers.json',
  ).then((r) => r.json());

  res.json(data);
};

export default livers;
