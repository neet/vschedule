import { NextApiHandler } from 'next';
import fetch from 'isomorphic-unfetch';

const events: NextApiHandler = async (req, res) => {
  const data = await fetch(
    'https://api.itsukaralink.jp/v1.2/events.json',
  ).then((r) => r.json());

  res.json(data);
};

export default events;
