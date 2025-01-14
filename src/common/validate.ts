import { HttpException, HttpStatus, ValidationError, ValidationPipe } from "@nestjs/common";

export default class Validate extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    const msg = {};
    validationErrors.forEach((error) => {
      msg[error.property] = Object.values(error.constraints)[0];
    });
    console.log(msg);
    throw new HttpException(
      {
        code: 422,
        msg,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    )
  }
}