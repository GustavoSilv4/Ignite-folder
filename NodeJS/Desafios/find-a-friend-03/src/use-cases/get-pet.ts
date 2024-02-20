import { PetsRepository } from '@/repositories/pets-repository'
import { RequirementsAdoptionRepository } from '@/repositories/requirements-adoption-repository'
import { Pet, RequirementAdoption } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-found-error'

interface GetPetUseCaseRequest {
  petId: string
}

interface GetPetUseCaseResponse {
  pet: Pet
  requirements_adoption: RequirementAdoption[]
}

export class GetPetUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private petsRepository: PetsRepository,
    private requirementsAdoptionRepository: RequirementsAdoptionRepository,
  ) {}

  async execute({
    petId,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    const requirements_adoption =
      await this.requirementsAdoptionRepository.findByPetId(pet.id)

    return {
      pet,
      requirements_adoption,
    }
  }
}
