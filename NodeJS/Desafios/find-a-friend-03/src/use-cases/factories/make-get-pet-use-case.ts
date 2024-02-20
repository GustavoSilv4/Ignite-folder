import { GetPetUseCase } from '../get-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaRequirementsAdoptionRepository } from '@/repositories/prisma/prisma-requirements-adoption-repository'

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const requirementsAdoption = new PrismaRequirementsAdoptionRepository()
  const useCase = new GetPetUseCase(petsRepository, requirementsAdoption)

  return useCase
}
