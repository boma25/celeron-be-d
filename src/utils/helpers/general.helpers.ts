import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';

export const validateDto = async (param: object): Promise<void> => {
  const validationErrors = await validate(param);
  if (!validationErrors.length) return;
  const errorsArr: string[] = [];
  for (const error of validationErrors) {
    for (const key in error.constraints) {
      errorsArr.push(error.constraints[key]);
    }
  }
  throw new BadRequestException(errorsArr);
};
