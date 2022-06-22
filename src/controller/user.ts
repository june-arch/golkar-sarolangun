import { NextApiRequest, NextApiResponse } from 'next';

import { exQuery } from '../lib/db';

const findUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await exQuery('select * from user', []);
  res.send(result);
};

export { findUser };
