import type { NextApiHandler } from 'next';

import { api } from '../../../api-legacy';

const genres: NextApiHandler = async (_req, res) => {
  const data = await api.fetchGenres();
  res.json(data);
};

export default genres;
