import { UseCaseError } from 'src/core/errors/use-case-error'

export class WrongCrenditialsError extends Error implements UseCaseError {
  constructor() {
    super('Crenditials are not valid')
  }
}
