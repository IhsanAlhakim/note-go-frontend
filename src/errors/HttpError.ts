class HttpError extends Error {
  desc: string[];
  constructor(desc: string) {
    super("HTTP Error");
    this.name = this.constructor.name;
    this.desc = [desc];
  }
}

export class ServerError extends HttpError {}

export class SignUpError extends HttpError {}
