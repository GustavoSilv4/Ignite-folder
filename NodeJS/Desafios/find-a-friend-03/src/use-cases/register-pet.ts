import { OrgsRepository } from '@/repositories/orgs-repository'
import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { RequirementsAdoptionRepository } from '@/repositories/requirements-adoption-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  about: string | null
  age: string
  size: number
  energy_level: number
  independence_level: number
  environment_type: number
  org_id: string
  requirements_adoption: string[]
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private orgsRepository: OrgsRepository,
    private petRepository: PetsRepository,
    private requirementsAdoptionRepository: RequirementsAdoptionRepository,
  ) {}

  async execute(
    data: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(data.org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const { requirements_adoption: pet_requirements_adoption, ...newPet } = data

    const pet = await this.petRepository.create({ ...newPet })

    pet_requirements_adoption.map(
      async (item) =>
        await this.requirementsAdoptionRepository.create({
          pet_id: pet.id,
          requirement: item,
        }),
    )

    return {
      pet,
    }
  }
}
