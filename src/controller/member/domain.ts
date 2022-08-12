import BadRequestError from '@/helpers/error/bad_request_error';
import InternalServerError from '@/helpers/error/internal_server_error';
import NotFoundError from '@/helpers/error/not_found_error';
import { unlinkByFileName } from '@/helpers/filter-uploads';
import * as wrapper from '@/helpers/wrapper';

import { Member } from './interface';
import {
  countAll,
  create,
  findAllPagination,
  findOneById,
  findOneByKTP,
  remove,
  updateById,
  updateStatusById,
} from './query';

export const getAllPagination = async (page, limit, search) => {
  const result = await findAllPagination(page, limit, search);
  const count = await countAll(search);
  if (result['err']) {
    return wrapper.error(new NotFoundError(result['err']));
  }
  if (result['data'].length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const meta = {
    page,
    totalData: count['data'][0].count,
    totalDataOnPage: result['data'].length,
    totalPage: Math.ceil(count['data'][0].count / limit),
  };
  return wrapper.dataPagination(result['data'], meta);
};

export const registerMember = async (files, payload) => {
  const { region_id, date_of_birth, status, ...createMember } = payload;

  const doc: Member = {
    ...createMember,
    region_id: Number(region_id),
    date_of_birth: date_of_birth,
    status: Number(status),
    photo: files ? files['photo'][0].filename : '',
    photo_ktp: files ? files['photo_ktp'][0].filename : '',
    is_deleted: 0,
  };
  const result = await create(doc);
  return wrapper.data(result['data']);
};

export const editMemberStatus = async (status, id) => {
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const find = await findOneById(id);
  if (find['err']) {
    return wrapper.error(new InternalServerError(find['err']));
  }
  if (find['data'].length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  if (find['data'][0].status == status) {
    return wrapper.error(new NotFoundError(`status already ${status}`));
  }

  const result = await updateStatusById(id, Number(status));
  return wrapper.data(result['data'][0]);
};

export const getOne = async (id) => {
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const result = await findOneById(id);
  if (result['err']) {
    return wrapper.error(new InternalServerError(result['err']));
  }
  if (result['data'].length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  let d = new Date(result['data'][0].date_of_birth);
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  result['data'][0].date_of_birth = `${ye}-${mo}-${da}`;
  return wrapper.data(result['data'][0]);
};

export const editMember = async (payload, id, files, user) => {
  const { region_id, date_of_birth, status, ...updateMember } = payload;

  if (!id) {
    return wrapper.error(new BadRequestError('id invalid'));
  }
  const find = await findOneById(id);
  if (find['err']) {
    return wrapper.error(new InternalServerError('error get data'));
  }
  if (find['data'].length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }

  if (region_id) updateMember['region_id'] = Number(region_id);
  if (date_of_birth) updateMember['date_of_birth'] = new Date(date_of_birth);
  if (status) updateMember['status'] = Number(status);
  delete updateMember['photo'];
  delete updateMember['photo_ktp'];
  if (files) {
    if (files['photo'] && files['photo'].length > 0) {
      updateMember['photo'] = files['photo'][0].filename;
    }
    if (files['photo_ktp'] && files['photo_ktp'].length > 0) {
      updateMember['photo_ktp'] = files['photo_ktp'][0].filename;
    }
  }
  updateMember['updated_by'] = user.id_admin;
  const doc: Member = {
    ...updateMember,
  };
  const result = await updateById(id, doc);
  if (result['err']) {
    return wrapper.error(new InternalServerError('error update data'));
  }
  if (files) {
    if (files['photo'] && files['photo'].length > 0) {
      unlinkByFileName('images/users', find['data'][0].photo);
    }
    if (files['photo_ktp'] && files['photo_ktp'].length > 0) {
      unlinkByFileName('images/users', find['data'][0].photo_ktp);
    }
  }
  return wrapper.data(result['data']);
};

export const removeMember = async (id) => {
  if (!id) {
    return wrapper.error(new BadRequestError('id invalid'));
  }
  const result = await remove(id);
  if (result['err']) {
    return wrapper.error(new InternalServerError(result['err']));
  }
  return wrapper.data(result['data']);
};

export const findMemberByKTP = async (nik) => {
  if (!nik) {
    return wrapper.error(new BadRequestError('invalid nik'));
  }
  const result = await findOneByKTP(nik);
  if (result['err']) {
    return wrapper.error(new InternalServerError(result['err']));
  }
  if (result['data'].length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  let status = 'Pending';
  if (result['data'][0].status == 0) status = 'Pending';
  if (result['data'][0].status == 1) status = 'Approved';
  if (result['data'][0].status == 2) status = 'Rejected';
  return wrapper.data({ status });
};
