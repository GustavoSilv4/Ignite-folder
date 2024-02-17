import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './register-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { EmailAlreadyExists } from './errors/email-already-exists'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const org = await sut.execute({
      responsible_person: 'Gustavo Silva',
      email: 'gustavo@gmail.com',
      cep: '12.345-290',
      adress: 'Av. Santa Maria',
      contact: '21 12345678',
      password: '123456',
    })

    expect(org).toEqual({
      org: expect.objectContaining({
        id: expect.any(String),
        responsible_person: 'Gustavo Silva',
        email: 'gustavo@gmail.com',
        cep: '12.345-290',
        adress: 'Av. Santa Maria',
        contact: '21 12345678',
        password_hash: expect.any(String),
        created_at: expect.any(Date),
      }),
    })
  })

  it('should not be able create two orgs with same email', async () => {
    await sut.execute({
      responsible_person: 'Gustavo Silva',
      email: 'gustavo@gmail.com',
      cep: '12.345-290',
      adress: 'Av. Santa Maria',
      contact: '21 12345678',
      password: '123456',
    })

    await expect(
      sut.execute({
        responsible_person: 'Gustavo Silva',
        email: 'gustavo@gmail.com',
        cep: '12.345-290',
        adress: 'Av. Santa Maria',
        contact: '21 12345678',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExists)
  })
})
