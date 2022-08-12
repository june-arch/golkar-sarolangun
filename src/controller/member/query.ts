import { execute } from '@/helpers/db/mysql';

import { Member } from './interface';

const table = 'member';

export const create = async (payload: Member) => {
  const fields = Object.keys(payload).map((key) => [key]);
  const values = Object.keys(payload).map((key) => `'${payload[key]}'`);
  let query = `insert into ${table} (${fields.join(',')}) values(${values.join(
    ','
  )})`;
  const result = await execute(query, []);
  return result;
};

export const findOneById = async (id: number) => {
  let query = `select * from ${table} where id_member = ? and is_deleted=0`;
  const result = await execute(query, [id]);
  return result;
};

export const findOneByKTP = async (nik: string) => {
  let query = `select * from ${table} where nik = ? and is_deleted=0`;
  const result = await execute(query, [nik]);
  return result;
};

export const updateById = async (id: number, doc: any) => {
  let set = [];
  let param: any[] = [];
  Object.keys(doc).map((value) => {
    set.push(`${value} = ?`);
    param.push(doc[value]);
  });
  param.push(id);
  let query = `update ${table} set ${set.join(',')} where id_member = ?`;
  const result = await execute(query, param);
  return result;
};
export const updateStatusById = async (id: number, status: number) => {
  let query = `update ${table} set status = ? where id_member = ?`;
  const result = await execute(query, [status, id]);
  return result;
};

export const remove = async (id: number) => {
  let query = `update ${table} set is_deleted = 1 where id_member = ?`;
  const result = await execute(query, [id]);
  return result;
};

export const findAllPagination = async (
  page: number,
  limit: number,
  search: string
) => {
  let query = `select * from ${table} where is_deleted=0 ${
    search && 'and fullname like "%' + search + '%"'
  } order by ? desc limit ? offset ?`;
  const result = await execute(query, [
    'created_date',
    limit,
    (page - 1) * limit,
  ]);
  return result;
};

export const countAll = async (search) => {
  let query = `select count(*) as count from ${table} where is_deleted=0 ${
    search && 'and fullname like "%' + search + '%"'
  }`;
  const result = await execute(query, []);
  return result;
};
