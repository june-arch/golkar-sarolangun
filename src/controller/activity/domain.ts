import NotFoundError from '@/helpers/error/not_found_error'
import { countAll, create, findAllPagination, findOneById, remove, updateById } from './query'
import * as wrapper from '@/helpers/wrapper'
import BadRequestError from '@/helpers/error/bad_request_error'
import { Activity } from './interface'
import { unlinkByFileName } from '@/helpers/filter-uploads'

export const getAllPagination = async (page: number, limit: number) => {
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
        totalPage: Math.ceil(count['data'][0].count / limit),
    }
    return wrapper.dataPagination(result['data'], meta);
}

export const getById = async (id: number) => {
    if (!id) {
        return wrapper.error(new BadRequestError('invalid id'))
    }
    const result = await findOneById(id)
    if (result['err']) {
        return wrapper.error(result['err'])
    }
    if (result['data'].length == 0) {
        return wrapper.error(new NotFoundError('data not found'))
    }
    return wrapper.data(result['data']);
}

export const createActivity = async (payload, files, user) => {
    const {category_activity_id, ...dataActivity} = payload;
    let imagesFilename = []
    if (files && files.length > 0) {
        files.forEach((value) => imagesFilename.push(value.filename))
    }
    const doc: Activity = {
        ...dataActivity,
        category_activity_id: Number(category_activity_id),
        admin_id: user.id_admin,
        image: imagesFilename.join(','),
        created_date: new Date(),
    }
    const result = await create(doc)
    return wrapper.data(result['data']);
}

export const removeActivity = async (id) => {
    if (!id) {
        return wrapper.error(new BadRequestError('invalid id'))
    }
    const find = await findOneById(id)
    if (find['err']) {
        return wrapper.error(find['err'])
    }
    if (find['data'].length == 0) {
        return wrapper.error(new NotFoundError('data not found'))
    }
    const result = await remove(id);
    if(result['err']){
        return wrapper.error(result['err'])
    }
    return wrapper.data(result['data']);
}

export const editActivity = async (payload, id, files, user) => {
    const {category_activity_id, ...dataActivity} = payload;
    if (!id) {
        return wrapper.error(new BadRequestError('invalid id'))
    }
    const find = await findOneById(id)
    if (find['err']) {
        return wrapper.error(find['err'])
    }
    if (find['data'].length == 0) {
        return wrapper.error(new NotFoundError('data not found'))
    }
    
    await removeFileImages(files, find['data'][0])
    let imagesFilename = []
    if (files && files.length > 0) {
        files.forEach((value) => imagesFilename.push(value.filename))
    }
    if(category_activity_id){
        dataActivity['category_activity_id'] = Number(category_activity_id);
    }
    if(imagesFilename.length > 0){
        dataActivity['image'] = imagesFilename.join(',');
    }
    const activity: Activity = {
        ...dataActivity,
        updated_by: user.id_admin,
        updated_date: new Date(),
    }
    const result = await updateById(id, activity)
    if (result['err']) {
        return wrapper.error(find['err'])
    }
    return wrapper.data(result['data']);
}

const removeFileImages = async (
    files: Express.Multer.File[],
    data: Activity
  ) => {
    if (files && files.length > 0) {
      for (let item of data.image.split(',')) {
        unlinkByFileName('images/activity', item)
      }
    }
}