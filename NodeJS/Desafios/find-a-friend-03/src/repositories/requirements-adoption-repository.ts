import { Prisma, RequirementAdoption } from '@prisma/client'

export interface RequirementsAdoptionRepository {
  findByPetId(petId: string): Promise<RequirementAdoption[]>
  create(
    data: Prisma.RequirementAdoptionUncheckedCreateInput,
  ): Promise<RequirementAdoption>
}
