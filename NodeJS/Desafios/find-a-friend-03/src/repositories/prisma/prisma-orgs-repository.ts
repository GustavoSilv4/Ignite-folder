import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  create(data: Prisma.OrgCreateInput) {
    throw new Error('Method not implemented.')
  }
}
