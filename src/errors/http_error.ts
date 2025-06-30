class HttpError extends Error {
  desc: string[];
  constructor(desc: string) {
    super("HTTP Error");
    // this.name = this.constructor.name;
    this.desc = [desc];
  }
}

export const responseStatusOK = 200;

export class ServerError extends HttpError {
  constructor() {
    super("Something went wrong on our server. Please try again later");
    this.name = "Server Error";
  }
}

export function isServerError(statusCode: number): boolean {
  if (statusCode >= 500 && statusCode < 600) return true;
  return false;
}

export class ClientError extends HttpError {
  constructor() {
    super("Something went wrong with the website. Please try again later");
    this.name = "Client Error";
  }
}

export function isClientError(statusCode: number): boolean {
  if (statusCode >= 400 && statusCode < 500) return true;
  return false;
}

export const conflicErrorStatusCode = 409;
export class ConflictError extends HttpError {
  constructor(desc: string) {
    super(desc);
    this.name = "Conflict Error";
  }
}

export const notFoundErrorStatusCode = 404;
export class NotFoundError extends HttpError {
  constructor(desc: string) {
    super(desc);
    this.name = "Not Found Error";
  }
}

export const UnauthorizedErrorStatusCode = 401;
export class UnauthorizedError extends HttpError {
  constructor(desc: string) {
    super(desc);
    this.name = "Unauthorized";
  }
}
