/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { NextApiHandler } from 'next';

import { api } from '../../../api-legacy';

const livers: NextApiHandler = async (_req, res) => {
  const data = await api.fetchLivers();
  res.json(data);
};

export default livers;
