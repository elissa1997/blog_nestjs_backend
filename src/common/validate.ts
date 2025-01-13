import { HttpException, HttpStatus, ValidationError, ValidationPipe } from "@nestjs/common";

export default class Validate extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    const messages = {};
    validationErrors.forEach((error) => {
      messages[error.property] = Object.values(error.constraints)[0];
    });
    console.log(messages);
    throw new HttpException(
      {
        code: 422,
        messages,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    )
  }
}