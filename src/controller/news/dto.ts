import Joi from 'joi'

export const news = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  category_news_id: Joi.string().required(),
  author: Joi.string().required(),
  image: Joi.object({
    type: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').allow(''),
  })
    .unknown()
    .allow(''),
})

export const newsOptional = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  category_news_id: Joi.string().optional(),
  author: Joi.string().optional(),
  image: Joi.object({
    type: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').allow(''),
  })
    .unknown()
    .allow('').optional(),
})
