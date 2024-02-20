import { Prisma } from '@prisma/client'
import { RequirementsAdoptionRepository } from '../requirements-adoption-repository'
import { prisma } from '@/lib/prisma'

export class PrismaRequirementsAdoptionRepository
  implements RequirementsAdoptionRepository
{
  async findByPetId(petId: string) {
    const requirementAdoption = await prisma.requirementAdoption.findMany({
      where: {
        pet_id: petId,
      },
    })

    return requirementAdoption
  }

  async create(data: Prisma.RequirementAdoptionUncheckedCreateInput) {
    const requirementsAdoption = await prisma.requirementAdoption.create({
      data,
    })

    return requirementsAdoption
  }
}
