import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreatePetUseCase } from './register-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryRequirementsAdoptionRepository } from '@/repositories/in-memory/in-memory-requirements-adoption-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let requirementsAdoptionRepository: InMemoryRequirementsAdoptionRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    requirementsAdoptionRepository =
      new InMemoryRequirementsAdoptionRepository()
    sut = new CreatePetUseCase(
      orgsRepository,
      petsRepository,
      requirementsAdoptionRepository,
    )
  })

  it('should be able to create a pet', async () => {
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

    const { pet } = await sut.execute({
      name: 'Alfredo',
      about: 'Um cão simpatico e alegre',
      age: '2',
      energy_level: 3,
      environment_type: 2,
      independence_level: 2,
      size: 2,
      org_id: org.id,
      requirements_adoption: [
        'Ter um bom espaço',
        'Uma boa alimentacao disponível',
      ],
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Alfredo',
      }),
    )
  })

  it('should not be able to create a pet for a organization non-existing', async () => {
    await expect(
      sut.execute({
        name: 'Alfredo',
        about: 'Um cão simpatico e alegre',
        age: '2',
        energy_level: 3,
        environment_type: 2,
        independence_level: 2,
        size: 2,
        org_id: 'Non-exist org',
        requirements_adoption: [
          'Ter um bom espaço',
          'Uma boa alimentacao disponível',
        ],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
