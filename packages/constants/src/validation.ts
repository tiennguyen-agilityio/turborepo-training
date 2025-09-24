import { Schema } from "effect";
import { REGEX } from "./common";
import { ERROR_MESSAGES } from "./messages";

export const SCHEMA = {
  email: Schema.String.pipe(
    Schema.nonEmptyString({
      message: () => ERROR_MESSAGES.FIELD_REQUIRED("Email"),
    }),
    Schema.pattern(REGEX.EMAIL, {
      message: () => ERROR_MESSAGES.FIELD_INVALID("Email"),
    })
  ),
  password: Schema.String.pipe(
    Schema.nonEmptyString({
      message: () => ERROR_MESSAGES.FIELD_REQUIRED("Password"),
    }),
    Schema.minLength(8, { message: () => ERROR_MESSAGES.PASSWORD_NOT_LONG }),
    Schema.pattern(REGEX.CHECK_NUMBER, {
      message: () => ERROR_MESSAGES.PASSWORD_NOT_HAVE_NUMBER,
    }),
    Schema.pattern(REGEX.CHECK_UPPERCASE, {
      message: () => ERROR_MESSAGES.PASSWORD_NOT_HAVE_UPPERCASE,
    }),
    Schema.pattern(REGEX.CHECK_SYMBOL, {
      message: () => ERROR_MESSAGES.PASSWORD_NOT_HAVE_SYMBOL,
    })
  ),
  firstName: Schema.String.pipe(
    Schema.nonEmptyString({
      message: () => ERROR_MESSAGES.FIELD_REQUIRED("First Name"),
    })
  ),
  lastName: Schema.String.pipe(
    Schema.nonEmptyString({
      message: () => ERROR_MESSAGES.FIELD_REQUIRED("Last Name"),
    })
  ),
  code: Schema.String.pipe(
    Schema.nonEmptyString({
      message: () => ERROR_MESSAGES.FIELD_REQUIRED("Code"),
    }),
    Schema.length(6, { message: () => ERROR_MESSAGES.CODE_NOT_LONG }),
    Schema.pattern(REGEX.CHECK_NUMBER, {
      message: () => ERROR_MESSAGES.CODE_INVALID,
    })
  ),
};

export const SCHEMA_SIGN_IN = Schema.Struct({
  email: SCHEMA.email,
  password: SCHEMA.password,
});

export const SCHEMA_SIGN_UP = Schema.Struct({
  email: SCHEMA.email,
  password: SCHEMA.password,
  firstName: SCHEMA.firstName,
  lastName: SCHEMA.lastName,
});

export const SCHEMA_VERIFY_CODE = Schema.Struct({
  code: SCHEMA.code,
});
