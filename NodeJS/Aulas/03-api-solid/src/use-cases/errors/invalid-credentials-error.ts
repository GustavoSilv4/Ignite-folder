export class InvalidCredetialsError extends Error {
  constructor() {
    super('Invalid credentials.')
  }
}
