export class ValidationError extends Error {
  desc: string[];
  constructor(desc: string[]) {
    super("Validation Error");
    this.name = "Validation Error";
    this.desc = desc;
  }
}
