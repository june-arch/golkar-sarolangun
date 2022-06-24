import { NextApiRequest, NextApiResponse } from "next";


const findUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const result ="hellow window";
  res.send(result);
};

export { findUser };
