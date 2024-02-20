import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate a org', async () => {
    await orgsRepository.create({
      responsible_person: 'John Doe',
      email: 'John.Doe@example.com',
      adress: 'Recanto dos Mares',
      cep: '12.345-678',
      city: 'Rio de Janeiro',
      state: 'RJ',
      contact: '21 12345678',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'John.Doe@example.com',
      password: '123456',
    })

    expect(org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        responsible_person: 'John Doe',
      }),
    )
  })

  it('should not be able to authenticate with wrong email', async () => {
    await orgsRepository.create({
      responsible_person: 'John Doe',
      email: 'John.Doe@example.com',
      adress: 'Recanto dos Mares',
      cep: '12.345-678',
      city: 'Rio de Janeiro',
      state: 'RJ',
      contact: '21 12345678',
      password_hash: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        email: 'WrongEmail@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      responsible_person: 'John Doe',
      email: 'John.Doe@example.com',
      adress: 'Recanto dos Mares',
      cep: '12.345-678',
      city: 'Rio de Janeiro',
      state: 'RJ',
      contact: '21 12345678',
      password_hash: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        email: 'John.Doe@example.com',
        password: 'Wrong password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
