import { member } from '@prisma/client';

import BadRequestError from '@/helpers/error/bad_request_error';
import ConflictError from '@/helpers/error/conflict_error';
import InternalServerError from '@/helpers/error/internal_server_error';
import NotFoundError from '@/helpers/error/not_found_error';
import { unlinkByFileName } from '@/helpers/filter-uploads';
import { deleteFile, uploadFile } from '@/helpers/gcp-bucket/connections';
import { computeMemberImage, computeOneMemberImage } from '@/helpers/utils/compute-image';
import * as wrapper from '@/helpers/wrapper';

import {
  countAll,
  create,
  findAllPagination,
  findOneById,
  findOneByKTP,
  remove,
  updateById,
  updateStatusById,
} from './member.query';

export const getAllPagination = async (page, limit, search) => {
  const result = await findAllPagination(page, limit, search);
  if (result.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  if (result.data && result.data.length == 0) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const count = await countAll(search);
  const computeMemberData = computeMemberImage(result.data);
  const meta = {
    page,
    totalData: count.data,
    totalDataOnPage: computeMemberData.length,
    totalPage: Math.ceil(count.data / limit),
  };
  return wrapper.dataPagination(computeMemberData, meta);
};

export const registerMember = async (files, payload) => {
  const { region_id, date_of_birth, status, ...createMember } = payload;
  if (files) {
    if (files['photo'] && files['photo'].length > 0) {
      await uploadFile('users', files['photo'][0]);
      createMember['photo'] = files['photo'][0].filename;
    }
    if (files['photo_ktp'] && files['photo_ktp'].length > 0) {
      await uploadFile('users', files['photo_ktp'][0]);
      createMember['photo_ktp'] = files['photo_ktp'][0].filename;
    }
  }
  const doc: member = {
    ...createMember,
    region_id: Number(region_id),
    date_of_birth: new Date(date_of_birth),
    status: Number(status),
    is_deleted: 0,
  };
  const result = await create(doc);
  if(result.err){
    if (files['photo'] && files['photo'].length > 0) {
      await deleteFile('users', result.data.photo);
      unlinkByFileName('images/users', result.data.photo);
    }
    if (files['photo_ktp'] && files['photo_ktp'].length > 0) {
      await deleteFile('users', result.data.photo_ktp);
      unlinkByFileName('images/users', result.data.photo_ktp);
    }
    return wrapper.error(new InternalServerError());
  }
  if (files) {
    if (files['photo'] && files['photo'].length > 0) {
      unlinkByFileName('images/users', result.data.photo);
    }
    if (files['photo_ktp'] && files['photo_ktp'].length > 0) {
      unlinkByFileName('images/users', result.data.photo_ktp);
    }
  }
  return wrapper.data(result.data);
};

export const editMemberStatus = async (status, id) => {
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const find = await findOneById(id);
  if (find.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  if (find.data.status == status) {
    return wrapper.error(new ConflictError(`status already ${status}`));
  }

  const result = await updateStatusById(id, Number(status));
  if(result.err){
    return wrapper.error(new InternalServerError());
  }
  return wrapper.data(result.data);
};

export const getOne = async (id) => {
  if (!id) {
    return wrapper.error(new BadRequestError('invalid id'));
  }
  const result = await findOneById(id);
  if (result.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  const computeMemberData = computeOneMemberImage(result.data);
  return wrapper.data(computeMemberData);
};

export const editMember = async (payload, id, files, user) => {
  const { region_id, date_of_birth, status, ...updateMember } = payload;

  if (!id) {
    return wrapper.error(new BadRequestError('id invalid'));
  }
  const find = await findOneById(id);
  if (find.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }

  if (region_id) updateMember['region_id'] = Number(region_id);
  if (date_of_birth) updateMember['date_of_birth'] = new Date(date_of_birth);
  if (status) updateMember['status'] = Number(status);
  delete updateMember['photo'];
  delete updateMember['photo_ktp'];
  if (files) {
    if (files['photo'] && files['photo'].length > 0) {
      await uploadFile('users', files['photo'][0]);
      updateMember['photo'] = files['photo'][0].filename;
    }
    if (files['photo_ktp'] && files['photo_ktp'].length > 0) {
      await uploadFile('users', files['photo_ktp'][0]);
      updateMember['photo_ktp'] = files['photo_ktp'][0].filename;
    }
  }
  updateMember['updated_by'] = user.id_admin;
  const result = await updateById(id, updateMember);
  if (result.err) {
    return wrapper.error(new InternalServerError());
  }
  if (files) {
    if (files['photo'] && files['photo'].length > 0) {
      await deleteFile('users', find.data.photo);
      unlinkByFileName('images/users', find.data.photo);
    }
    if (files['photo_ktp'] && files['photo_ktp'].length > 0) {
      await deleteFile('users', find.data.photo_ktp);
      unlinkByFileName('images/users', find.data.photo_ktp);
    }
  }
  return wrapper.data(result.data);
};

export const removeMember = async (id) => {
  if (!id) {
    return wrapper.error(new BadRequestError('id invalid'));
  }
  const result = await remove(id);
  if (result.err) {
    return wrapper.error(new InternalServerError());
  }
  return wrapper.data(result.data);
};

export const findMemberByKTP = async (nik) => {
  if (!nik) {
    return wrapper.error(new BadRequestError('invalid nik'));
  }
  const result = await findOneByKTP(nik);
  if (result.err) {
    return wrapper.error(new NotFoundError('data not found'));
  }
  let status = 'Pending';
  if (result.data.status == 0) status = 'Pending';
  if (result.data.status == 1) status = 'Approved';
  if (result.data.status == 2) status = 'Rejected';
  return wrapper.data({ status });
};
