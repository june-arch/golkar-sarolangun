import Joi from "joi";

const images = Joi.object({
    type:Joi.string().valid('image/jpeg','image/png','image/jpg').allow('')
}).unknown().allow('')

const videos = Joi.object({
    type:Joi.string().valid('video/mp4','image/ogg').allow('')
}).unknown().allow('')

export const activity = Joi.object({
    title: Joi.string().required(),
    category_activity_id: Joi.string().required(),
    image: Joi.array().items(images).allow(''),
    video: Joi.string().allow(''),
});