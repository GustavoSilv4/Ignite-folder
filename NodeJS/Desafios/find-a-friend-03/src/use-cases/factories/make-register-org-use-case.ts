import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgUseCase } from '../register-org'

export function makeRegisterOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new CreateOrgUseCase(orgsRepository)

  return useCase
}
