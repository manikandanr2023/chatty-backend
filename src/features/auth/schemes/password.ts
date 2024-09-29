import Joi, { ObjectSchema } from "joi";
<<<<<<< HEAD
const emailSchema: ObjectSchema = Joi.object().keys({
=======
export const emailSchema: ObjectSchema = Joi.object().keys({
>>>>>>> 2fbf8b2 (feat: implemented password reset feature with unit test)
  email: Joi.string().email().required().messages({
    "string.base": "Field must be valid",
    "string.required": "Field must be valid",
    "string.email": "Field must be valid"
  })
});

<<<<<<< HEAD
const passwordShema: ObjectSchema = Joi.object().keys({
=======
export const passwordSchema: ObjectSchema = Joi.object().keys({
>>>>>>> 2fbf8b2 (feat: implemented password reset feature with unit test)
  password: Joi.string().required().min(4).max(8).messages({
    "string.base": "Password should be of type string",
    "string.min": "Invalid password",
    "string.max": "Invalid password",
    "string.empty": "Password is a required field"
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
<<<<<<< HEAD
    "any.only": "Password should match",
=======
    "any.only": "Passwords should match",
>>>>>>> 2fbf8b2 (feat: implemented password reset feature with unit test)
    "any.required": "Confirm password is a required field"
  })
});
