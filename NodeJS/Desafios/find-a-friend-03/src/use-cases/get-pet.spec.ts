import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryRequirementsAdoptionRepository } from '@/repositories/in-memory/in-memory-requirements-adoption-repository'
import { hash } from 'bcryptjs'
import { GetPetUseCase } from './get-pet'
import { PetNotFoundError } from './errors/pet-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let requirementsAdoptionRepository: InMemoryRequirementsAdoptionRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    requirementsAdoptionRepository =
      new InMemoryRequirementsAdoptionRepository()
    sut = new GetPetUseCase(petsRepository, requirementsAdoptionRepository)
  })

  it('should be able to get a pet', async () => {
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

    const newPet = await petsRepository.create({
      name: 'Alfredo',
      about: 'Um cão simpatico e alegre',
      age: '2',
      energy_level: 3,
      environment_type: 2,
      independence_level: 2,
      size: 2,
      org_id: org.id,
    })

    await requirementsAdoptionRepository.create({
      pet_id: newPet.id,
      requirement: 'Necessário um bom ambiente externo',
    })

    await requirementsAdoptionRepository.create({
      pet_id: newPet.id,
      requirement: 'Comida e aguá disponivel a todo momento',
    })

    const { pet, requirements_adoption } = await sut.execute({
      petId: newPet.id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Alfredo',
      }),
    )

    expect(requirements_adoption).toHaveLength(2)
  })

  it('should not be able to get a pet non-existent', async () => {
    await expect(
      sut.execute({
        petId: 'Id non-existent',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
