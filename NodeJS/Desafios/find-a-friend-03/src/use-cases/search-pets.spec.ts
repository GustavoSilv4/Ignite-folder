import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { SearchPetsUseCase } from './search-pets'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search all pets by city', async () => {
    const org = await orgsRepository.create({
      responsible_person: 'Gustavo Silva',
      email: 'gustavo@gmail.com',
      cep: '12.345-290',
      city: 'Rio de Janeiro',
      state: 'RJ',
      adress: 'Av. Santa Maria',
      contact: '21 12345678',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
      name: 'Alfredo',
      about: 'Um cão simpatico e alegre',
      age: '2',
      energy_level: 3,
      environment_type: 2,
      independence_level: 2,
      size: 2,
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Garfild',
      about: 'Um cão muito agitado',
      age: '1',
      energy_level: 5,
      environment_type: 3,
      independence_level: 1,
      size: 1,
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Rabisco',
      about: 'Um cão simpatico e alegre',
      age: '2',
      energy_level: 3,
      environment_type: 2,
      independence_level: 2,
      size: 2,
      org_id: 'Some Org',
    })

    const { pets } = await sut.execute({
      query: { city: 'Rio de Janeiro' },
      page: 1,
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
      }),
      expect.objectContaining({
        name: 'Garfild',
      }),
    ])

    expect(pets).toHaveLength(2)
  })

  it('should be able to search all pets by city and age', async () => {
    const org = await orgsRepository.create({
      responsible_person: 'Gustavo Silva',
      email: 'gustavo@gmail.com',
      cep: '12.345-290',
      city: 'Rio de Janeiro',
      state: 'RJ',
      adress: 'Av. Santa Maria',
      contact: '21 12345678',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
      name: 'Alfredo',
      about: 'Um cão simpatico e alegre',
      age: '2',
      energy_level: 3,
      environment_type: 2,
      independence_level: 2,
      size: 2,
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Cabral',
      about: 'Um cão muito agitado',
      age: '2',
      energy_level: 5,
      environment_type: 3,
      independence_level: 1,
      size: 1,
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Garfild',
      about: 'Um cão muito agitado',
      age: '1',
      energy_level: 5,
      environment_type: 3,
      independence_level: 1,
      size: 1,
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Rabisco',
      about: 'Um cão simpatico e alegre',
      age: '2',
      energy_level: 3,
      environment_type: 2,
      independence_level: 2,
      size: 2,
      org_id: 'Some Org',
    })

    const { pets } = await sut.execute({
      query: { city: 'Rio de Janeiro', age: '2' },
      page: 1,
    })

    const { pets: petsWithAge1 } = await sut.execute({
      query: { city: 'Rio de Janeiro', age: '1' },
      page: 1,
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
      }),
      expect.objectContaining({
        name: 'Cabral',
      }),
    ])

    expect(pets).toHaveLength(2)

    expect(petsWithAge1).toEqual([
      expect.objectContaining({
        name: 'Garfild',
      }),
    ])

    expect(petsWithAge1).toHaveLength(1)
  })

  it('should be able to search all pets by city and energy level', async () => {
    const org = await orgsRepository.create({
      responsible_person: 'Gustavo Silva',
      email: 'gustavo@gmail.com',
      cep: '12.345-290',
      city: 'Rio de Janeiro',
      state: 'RJ',
      adress: 'Av. Santa Maria',
      contact: '21 12345678',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
      name: 'Alfredo',
      about: 'Um cão simpatico e alegre',
      age: '2',
      energy_level: 3,
      environment_type: 2,
      independence_level: 2,
      size: 2,
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Cabral',
      about: 'Um cão muito agitado',
      age: '2',
      energy_level: 5,
      environment_type: 3,
      independence_level: 1,
      size: 1,
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Rabisco',
      about: 'Um cão simpatico e alegre',
      age: '2',
      energy_level: 3,
      environment_type: 2,
      independence_level: 2,
      size: 2,
      org_id: 'Some Org',
    })

    const { pets } = await sut.execute({
      query: { city: 'Rio de Janeiro', energy_level: 3 },
      page: 1,
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
      }),
    ])

    expect(pets).toHaveLength(1)
  })

  it('should be able to search all pets by city and size', async () => {
    const org = await orgsRepository.create({
      responsible_person: 'Gustavo Silva',
      email: 'gustavo@gmail.com',
      cep: '12.345-290',
      city: 'Rio de Janeiro',
      state: 'RJ',
      adress: 'Av. Santa Maria',
      contact: '21 12345678',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
      name: 'Alfredo',
      about: 'Um cão simpatico e alegre',
      age: '2',
      energy_level: 3,
      environment_type: 2,
      independence_level: 2,
      size: 2,
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Cabral',
      about: 'Um cão muito agitado',
      age: '2',
      energy_level: 5,
      environment_type: 3,
      independence_level: 1,
      size: 1,
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Rabisco',
      about: 'Um cão simpatico e alegre',
      age: '2',
      energy_level: 3,
      environment_type: 2,
      independence_level: 2,
      size: 2,
      org_id: 'Some Org',
    })

    const { pets } = await sut.execute({
      query: { city: 'Rio de Janeiro', size: 1 },
      page: 1,
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Cabral',
      }),
    ])

    expect(pets).toHaveLength(1)
  })

  it('should be able to search all pets by city and level of dependence', async () => {
    const org = await orgsRepository.create({
      responsible_person: 'Gustavo Silva',
      email: 'gustavo@gmail.com',
      cep: '12.345-290',
      city: 'Rio de Janeiro',
      state: 'RJ',
      adress: 'Av. Santa Maria',
      contact: '21 12345678',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
      name: 'Alfredo',
      about: 'Um cão simpatico e alegre',
      age: '2',
      energy_level: 3,
      environment_type: 2,
      independence_level: 5,
      size: 2,
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Cabral',
      about: 'Um cão muito agitado',
      age: '2',
      energy_level: 5,
      environment_type: 3,
      independence_level: 5,
      size: 1,
      org_id: org.id,
    })

    await petsRepository.create({
      name: 'Rabisco',
      about: 'Um cão simpatico e alegre',
      age: '2',
      energy_level: 3,
      environment_type: 2,
      independence_level: 2,
      size: 2,
      org_id: 'Some Org',
    })

    const { pets } = await sut.execute({
      query: { city: 'Rio de Janeiro', independence_level: 5 },
      page: 1,
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
      }),
      expect.objectContaining({
        name: 'Cabral',
      }),
    ])

    expect(pets).toHaveLength(2)
  })
})
