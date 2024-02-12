export class MaxNumberOffCheckInsError extends Error {
  constructor() {
    super('Max number check ins reached.')
  }
}
