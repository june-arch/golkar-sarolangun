import nc from 'next-connect';

import { findUser } from '../../controller/user';

const handler = nc();
handler.get(findUser);
export default handler;
