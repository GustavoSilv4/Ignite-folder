import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  query: {
    city: string
    age?: string
    energy_level?: number
    size?: number
    independence_level?: number
  }
  page: number
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    page,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany({ query, page })

    return {
      pets,
    }
  }
}
