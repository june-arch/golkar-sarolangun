import { execute } from '@/helpers/db/mysql'
import crypto from 'crypto'
import { Admin } from './interface'
const salt = '34d1a573380d0508c306439b030c6e8f'
const table = 'admin';

export const validatePassword = (user: Admin, inputPassword: string) => {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, salt, 1000, 24, 'sha512')
        .toString('hex')
    const passwordsMatch = user.password === inputHash
    return passwordsMatch
}

export const create = async (admin: Admin) => {
    const hash = crypto
        .pbkdf2Sync(admin.password, salt, 1000, 24, 'sha512')
        .toString('hex')
    admin.password = hash
    return await execute(`insert into ${table} values(?)`, [admin]);
}

export const findOneByUserame = async (username: string) => {
    return await execute(`select * from ${table} where username = ?`, [username]);
}

export const findOneById = async (id: number) => {
    return await execute(`select * from ${table} where id = ?`, [id]);
}

export const updateById = async (id: number, doc: Admin) => {
    if(doc.password){
        const hash = crypto
        .pbkdf2Sync(doc.password, salt, 1000, 24, 'sha512')
        .toString('hex')
        doc.password = hash
    }
    let set = '';
	let param: any[] = [];
	Object.keys(doc).map((value) => {
		set += `set ${value} = ? `;
		param.push(doc[value]);
	});
	param.push(id);
    let query = `update ${table} ${set} where id = ?`;
	const result = await execute(query,param);
	return result;
}

export const remove = async (id: number) => {
    let query = `delete from ${table} where id = ?`;
	const result = await execute(query,[id]);
	return result;
}

export const findAllPagination = async (page: number, limit: number) => {
    let query = `select * from ${table} order by ? desc limit ? offset ?`;
	const result = await execute(query,['created_date', limit, (page-1)*limit]);
	return result;
}

export const countAll = async () => {
    let query = `select count(*) as count from ${table}`;
	const result = await execute(query,[]);
	return result;
}
