import Joi from "joi";

export const createMember = Joi.object({
    region_id: Joi.number().required(),
    nik: Joi.string().max(25).min(16).required(),
    fullname: Joi.string().max(255).required(),
    photo:Joi.object({
        type:Joi.string().valid('image/jpeg','image/png','image/jpg').allow('')
    }).unknown().allow(''),
    photo_ktp:Joi.object({
        type:Joi.string().valid('image/jpeg','image/png','image/jpg').allow('')
    }).unknown().allow(''),
    address: Joi.string().required(),
    phone_number: Joi.string().max(15).required(),
    email: Joi.string().email().required(),
    place_of_birth: Joi.string().max(100).required(),
    date_of_birth: Joi.string().required(),
    gender: Joi.string().valid('L', 'P'),
    status: Joi.number().valid(0, 1, 2),
});

export const updateMember = Joi.object({
    region_id: Joi.number(),
    nik: Joi.string().max(25).min(16),
    fullname: Joi.string().max(255),
    photo:Joi.object({
        type:Joi.string().valid('image/jpeg','image/png','image/jpg').allow('')
    }).unknown().allow(''),
    photo_ktp:Joi.object({
        type:Joi.string().valid('image/jpeg','image/png','image/jpg').allow('')
    }).unknown().allow(''),
    address: Joi.string(),
    phone_number: Joi.string().max(15),
    email: Joi.string().email(),
    place_of_birth: Joi.string().max(100),
    date_of_birth: Joi.string(),
    gender: Joi.string().valid('L', 'P'),
    status: Joi.number().valid(0, 1, 2),
});

export const updateStatusMember = Joi.object({
    status: Joi.number().valid(1, 2),
});