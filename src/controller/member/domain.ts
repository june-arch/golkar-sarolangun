import NotFoundError from '@/helpers/error/not_found_error'
import { create, countAll, findAllPagination, findOneById, remove, updateById, updateStatusById } from './query'
import * as wrapper from '@/helpers/wrapper'
import { readFileSync } from 'fs'
import { createWorker } from 'tesseract.js'
import BadRequestError from '@/helpers/error/bad_request_error'
import { Member } from './interface'
import InternalServerError from '@/helpers/error/internal_server_error'
import { unlinkByFileName } from '@/helpers/filter-uploads'

export const getAllPagination = async (page, limit) => {
    const result = await findAllPagination(page, limit)
    const count = await countAll()
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
    }
    return wrapper.dataPagination(result['data'], meta);
}

export const registerMember = async (files, payload) => {
    const { region_id, nik, date_of_birth, status, ...createMember} = payload;
    const img = readFileSync(
        files['photo_ktp'][0].destination + '/' + files['photo_ktp'][0].filename
    )
    const worker = createWorker()
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    const ocr = await worker.recognize(img)
    await worker.terminate()
    const regex = new RegExp(`${nik}$`, 'm')
    if (!(ocr.data && regex.test(ocr.data.text))) {
    return wrapper.error(new BadRequestError('failed photo ktp tidak sesuai'));
    }

    const doc: Member = {
        ...createMember,
        region_id: Number(region_id),
        date_of_birth: new Date(date_of_birth),
        status: Number(status),
        photo: files ? files['photo'][0].filename : '',
        created_date: new Date(),
        photo_ktp: files ? files['photo_ktp'][0].filename : '',
    }
    const result = await create(doc)
    return wrapper.data(result['data']);
}

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

    const result = await updateStatusById(id, Number(status))
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
    if (result['data'].length == 0) {
        return wrapper.error(new NotFoundError('data not found'));
    }
    return wrapper.data(result['data'][0]);
}

export const editMember = async (payload, id, files, user) => {
    const {region_id, date_of_birth, status, ...updateMember} = payload;
    
    if (!id) {
        return wrapper.error(new BadRequestError('id invalid'));
    }
    const find = await findOneById(id);
    if (find['err']) {
        return wrapper.error(new InternalServerError(find['err']));
    }
    if (find['data'].length == 0) {
        return wrapper.error(new NotFoundError('data not found'));
    }
      
    if (region_id) updateMember['region_id'] = Number(region_id)
    if (date_of_birth) updateMember['date_of_birth'] = new Date(date_of_birth)
    if (status) updateMember['status'] = Number(status)
    if (files) {
        if (files['photo'] && files['photo'].length > 0) {
            updateMember['photo'] = files['photo'][0].filename
        }
        if (files['photo_ktp'] && files['photo_ktp'].length > 0) {
            updateMember['photo_ktp'] = files['photo_ktp'][0].filename
        }
    }
    updateMember['updated_by'] = user.id_admin
    const doc: Member = {
        ...updateMember,
        updated_at: new Date(),
    }
    const result = await updateById(id, doc)
    if (result['err']) {
        return wrapper.error(new InternalServerError(find['err']));
    }
    if (files) {
        if (files['photo'] && files['photo'].length > 0) {
            unlinkByFileName('images/users', find['data'][0].photo)
        }
        if (files['photo_ktp'] && files['photo_ktp'].length > 0) {
            unlinkByFileName('images/users', find['data'][0].photo_ktp)
        }
    }
    return wrapper.data(result['data']);
}

export const removeMember = async (id) => {
    if (!id) {
        return wrapper.error(new BadRequestError('id invalid'));
    }
    const result = await remove(id)
    if (result['err']) {
        return wrapper.error(new InternalServerError(result['err']));
    }
    return wrapper.data(result['data']);
}