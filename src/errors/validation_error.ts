export class ValidationError extends Error {
  desc: string[];
  constructor(desc: string[]) {
    super("Validation Error");
    this.name = this.constructor.name;
    this.desc = desc;
  }
}
