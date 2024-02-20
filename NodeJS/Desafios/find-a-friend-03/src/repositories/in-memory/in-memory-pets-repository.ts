import { Pet, Prisma } from '@prisma/client'
import { PetsRepository, SearchManyParams } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  private items: Pet[] = []

  // eslint-disable-next-line no-useless-constructor
  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async searchMany({ query, page }: SearchManyParams) {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === query.city,
    )

    const filteredPets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (query.age ? item.age === query.age : true))
      .filter((item) =>
        query.energy_level ? item.energy_level === query.energy_level : true,
      )
      .filter((item) => (query.size ? item.size === query.size : true))
      .filter((item) =>
        query.independence_level
          ? item.independence_level === query.independence_level
          : true,
      )

    const pets = filteredPets.slice((page - 1) * 20, 20 * page)

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? crypto.randomUUID(),
      name: data.name,
      about: data.about || null,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment_type: data.environment_type,
      created_at: new Date(),
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }
}
