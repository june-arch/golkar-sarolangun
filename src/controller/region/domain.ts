import InternalServerError from "@/helpers/error/internal_server_error";
import NotFoundError from "@/helpers/error/not_found_error";
import { countAll, create, findAll, findAllPagination, findOneById, remove, updateById } from "./query";
import * as wrapper from '@/helpers/wrapper'
import { Region } from "./interface";
import BadRequestError from "@/helpers/error/bad_request_error";

export const getAll = async () => {
    const result = await findAll();
    if (result['err']) {
        return wrapper.error(new InternalServerError(result['err']));
    }
    if (result['data'].lenth == 0) {
        return wrapper.error(new NotFoundError('data not found'));
    }
    return wrapper.data(result['data']);
}

export const getAllPagination = async (page, limit, search) => {
    const result = await findAllPagination(page, limit, search)
    const count = await countAll(search)
    if (result['err']) {
        return wrapper.error(new NotFoundError(result['err']))
    }
    if (result['data'].length == 0) {
        return wrapper.error(new NotFoundError('data not found'))
    }

    const meta = {
        page,
        totalData: count['data'][0].count,
        totalDataOnPage: result['data'].length,
        totalPage: Math.ceil(count['data'][0].count / limit),
    }
    return wrapper.dataPagination(result['data'], meta);
}

export const createRegion = async (payload) => {
    const region: Region = {
        ...payload
    }
    const result = await create(region)
    if (result['err']) {
        return wrapper.error(new InternalServerError(result['err']));
    }
    return wrapper.data(result['data']);
}
export const editRegion = async (id, payload) => {
    if (!id) {
        return wrapper.error(new BadRequestError('invalid id'));
    }
    const doc: Region = payload
    const result = await updateById(id, doc)
    if (result['err']) {
        return wrapper.error(new InternalServerError(result['err']));
    }
    return wrapper.data(result['data'][0]);
}
export const getOne = async (id) => {
    if (!id) {
        return wrapper.error(new BadRequestError('invalid id'));
    }
    const result = await findOneById(id);
    if (result['err']) {
        return wrapper.error(new InternalServerError(result['err']));
    }
    if (result['data'].lenth == 0) {
        return wrapper.error(new NotFoundError('data not found'));
    }
    return wrapper.data(result['data'][0]);
}
export const deleteRegion = async (id) => {
    if (!id) {
        return wrapper.error(new BadRequestError('invalid id'));
    }
    const find = await findOneById(id)
    if (find['err']) {
        return wrapper.error(new InternalServerError(find['err']));
    }
    if (find['data'].lenth == 0) {
        return wrapper.error(new NotFoundError('data not found'));
    }
    const result = await remove(id)
    if (result['err']) {
        return wrapper.error(new InternalServerError(result['err']));
    }
    return wrapper.data(result['data']);
}