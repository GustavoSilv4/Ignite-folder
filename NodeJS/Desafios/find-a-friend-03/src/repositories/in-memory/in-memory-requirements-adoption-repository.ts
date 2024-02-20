import { Prisma, RequirementAdoption } from '@prisma/client'
import { RequirementsAdoptionRepository } from '../requirements-adoption-repository'

export class InMemoryRequirementsAdoptionRepository
  implements RequirementsAdoptionRepository
{
  private items: RequirementAdoption[] = []

  async findByPetId(petId: string) {
    const requirements = this.items.filter((items) => items.pet_id === petId)

    return requirements
  }

  async create(data: Prisma.RequirementAdoptionUncheckedCreateInput) {
    const requirements = {
      id: crypto.randomUUID(),
      requirement: data.requirement,
      pet_id: data.pet_id,
    }

    this.items.push(requirements)

    return requirements
  }
}
