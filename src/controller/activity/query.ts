import { Activity } from "./interface";
import { execute } from "@/helpers/db/mysql";

const table = 'activity';

export const create = async (payload: Activity) => {
	const fields = Object.keys(payload).map((key) => [key]);
	const values = Object.keys(payload).map((key) => `'${payload[key]}'`);
	let query = `insert into ${table} (${fields.join(',')}) values(${values.join(',')})`;
    const result = await execute(query,[]);
    return result;
}

export const findOneById = async (id: number) => {
	let query = `select * from ${table} where id_activity = ?`;
	const result = await execute(query,[id]);
	return result;
}

export const updateById = async (id: number, doc: Activity) => {
	let set = [];
	let param: any[] = [];
	Object.keys(doc).map((value) => {
		set.push(`${value} = ?`);
		param.push(doc[value]);
	});
	param.push(id);
	let query = `update ${table} set ${set.join(',')} where id_activity = ?`;
	const result = await execute(query,param);
	return result;
}

export const remove = async (id: number) => {
	let query = `delete from ${table} where id_activity = ?`;
	const result = await execute(query,[id]);
	return result;
}

export const findAllPagination = async (page: number, limit: number, search?: string) => {
	let query = `select * from ${table} ${search && 'where title like "%'+ search+'%"'} order by ? desc limit ? offset ?`;
	const result = await execute(query,['created_date', limit, (page-1)*limit]);
	return result;
}

export const findAllPaginationHome = async (page: number, limit: number) => {
	let query = `SELECT a.id_activity, b.name AS category, a.title, a.created_date, a.image, a.video FROM activity a LEFT JOIN category_activity b ON a.category_activity_id = b.id_category_activity ORDER BY a.created_date DESC LIMIT ? OFFSET ?`
	const result = await execute(query,[limit, (page-1)*limit]);
	return result;
}

export const countAll = async (search?: string) => {
	let query = `select count(*) as count from ${table} ${search && 'where title like "%'+ search+'%"'}`;
	const result = await execute(query,[]);
	return result;
}
