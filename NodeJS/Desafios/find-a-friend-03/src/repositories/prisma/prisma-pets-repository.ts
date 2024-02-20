import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsRepository, SearchManyParams } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async searchMany({ query, page }: SearchManyParams) {
    const pet = await prisma.pet.findMany({
      where: {
        org: {
          city: {
            contains: query.city,
          },
        },
        age: query.age,
        energy_level: query.energy_level,
        independence_level: query.independence_level,
        size: query.size,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
