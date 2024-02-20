import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaRequirementsAdoptionRepository } from '@/repositories/prisma/prisma-requirements-adoption-repository'
import { CreatePetUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const requirementsAdoption = new PrismaRequirementsAdoptionRepository()
  const useCase = new CreatePetUseCase(
    orgsRepository,
    petsRepository,
    requirementsAdoption,
  )

  return useCase
}
