import Joi, { string } from 'joi'

const foodItemSchema = Joi.object({
    id: Joi.string().alphanum(),
    name: Joi.string().alphanum().min(2).max(50),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number(),
    sugarfree: Joi.bool(),
    allergies: Joi.array().items(Joi.string())
}).required()

export { foodItemSchema }