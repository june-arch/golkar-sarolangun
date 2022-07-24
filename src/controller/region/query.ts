import { execute } from "@/helpers/db/mysql";
import { Region } from "./interface";

const table = 'region';

export const create = async (payload: Region) => {
    let query = `insert into ${table} values(?)`
    const result = await execute(query,[payload]);
    return result;
}

export const findOneById = async (id: number) => {
    let query = `select * from ${table} where id_regional = ?`;
	const result = await execute(query,[id]);
	return result;
}

export const updateById = async (id: number, doc: Region) => {
    let set = '';
	let param: any[] = [];
	Object.keys(doc).map((value) => {
		set += `set ${value} = ? `;
		param.push(doc[value]);
	});
	param.push(id);
	let query = `update ${table} ${set} where id_regional = ?`;
	const result = await execute(query,param);
	return result;
}

export const remove = async (id: number) => {
    let query = `delete from ${table} where id_regional = ?`;
	const result = await execute(query,[id]);
	return result;
}

export const findAll = async () => {
    let query = `select * from ${table}`;
	const result = await execute(query,[]);
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
