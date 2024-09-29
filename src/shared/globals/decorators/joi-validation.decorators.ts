/* eslint-disable @typescript-eslint/no-explicit-any */
import { JoiRequestValidationError } from "@global/helpers/error-handler";
import { Request } from "express";
import { ObjectSchema } from "joi";
type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void;
// This is the validation of JoiValidation
export function joiValidation(schema: ObjectSchema): IJoiDecorator {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    //...args:any[] specifies the req,res,next
    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0]; //Request argument
      const { error } = await Promise.resolve(schema.validate(req.body)); //getting error
      if (error?.details) {
        throw new JoiRequestValidationError(error.details[0].message);
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
