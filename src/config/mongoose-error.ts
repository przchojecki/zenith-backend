import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Error } from 'mongoose';

@Catch(Error.ValidationError)
export class MongooseValidationErrorFilter implements ExceptionFilter {
  catch(exception: Error.ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const validationErrors = {};
    Object.keys(exception.errors).forEach((key) => {
      validationErrors[key] = exception.errors[key].message;
    });

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed',
      errors: validationErrors,
    });
  }
}
