import { execute } from "@/helpers/db/mysql";
import { News } from "./interface";

const table = 'news';

export const create = async (payload: News) => {
	const fields = Object.keys(payload).map((key) => [key]);
	const values = Object.keys(payload).map((key) => `'${payload[key]}'`);
	let query = `insert into ${table} (${fields.join(',')}) values(${values.join(',')})`;
    const result = await execute(query,[]);
    return result;
}

export const findOneById = async (id: number) => {
    let query = `select * from ${table} where id_news = ?`;
	const result = await execute(query,[id]);
	return result;
}

export const updateById = async (id: number, doc: News) => {
    let set = [];
	let param: any[] = [];
	Object.keys(doc).map((value) => {
		set.push(`${value} = ?`);
		param.push(doc[value]);
	});
	param.push(id);
	let query = `update ${table} set ${set.join(',')} where id_news = ?`;
	const result = await execute(query,param);
	return result;
}

export const remove = async (id: number) => {
    let query = `delete from ${table} where id_news = ?`;
	const result = await execute(query,[id]);
	return result;
}

export const findAllPagination = async (page: number, limit: number) => {
    let query = `select * from ${table} order by ? desc limit ? offset ?`;
	const result = await execute(query,['created_date', limit, (page-1)*limit]);
	return result;
}

export const findAllPaginationHome = async (page: number, limit: number) => {
	let query = `SELECT a.id_news, b.name AS category, a.title, a.content, a.created_date,  a.image, a.author
	FROM news a
	LEFT JOIN category_news b
	ON a.category_news_id = b.id_category_news
	ORDER BY a.created_date DESC 
	LIMIT ?
	OFFSET ?`;
	const result = await execute(query,[limit, (page-1)*limit]);
	return result;
}

export const countAll = async () => {
    let query = `select count(*) as count from ${table}`;
	const result = await execute(query,[]);
	return result;
}
