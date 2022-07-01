import Joi from "joi";

export const news = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    category_news_id: Joi.string().required(),
    publisher: Joi.string().required(),
    image:Joi.object({
        type:Joi.string().valid('image/jpeg','image/png','image/jpg').allow('')
    }).unknown().allow('')
});