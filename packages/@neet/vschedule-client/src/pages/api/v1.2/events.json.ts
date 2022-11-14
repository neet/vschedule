import type { NextApiHandler } from 'next';

import { api } from '../../../api-legacy';

const events: NextApiHandler = async (_req, res) => {
  const data = await api.fetchEvents();
  res.json(data);
};

export default events;
