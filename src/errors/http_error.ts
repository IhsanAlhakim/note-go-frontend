class HttpError extends Error {
  desc: string[];
  constructor(desc: string) {
    super("HTTP Error");
    this.name = this.constructor.name;
    this.desc = [desc];
  }
}

export const responseStatusOK = 200;

export class ServerError extends HttpError {
  constructor() {
    super("Something went wrong on our server. Please try again later");
  }
}

export const conflicErrorStatusCode = 409;
export class ConflictError extends HttpError {}

export const notFoundErrorStatusCode = 404;
export class NotFoundError extends HttpError {}

export const UnauthorizedErrorStatusCode = 401;
export class UnauthorizedError extends HttpError {}

export class LoginError extends HttpError {}
