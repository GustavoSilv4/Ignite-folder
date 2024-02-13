import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Fetch User Check-in History Use Case', async () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await gymsRepository.create({
      title: 'Python Gym',
      description: null,
      phone: null,
      latitude: -22.967116,
      longitude: -43.705902,
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -22.967116,
      longitude: -43.705902,
    })

    const { gyms } = await sut.execute({
      query: 'Python',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Python Gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Python Gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.967116,
        longitude: -43.705902,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Python',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Python Gym 21' }),
      expect.objectContaining({ title: 'Python Gym 22' }),
    ])
  })
})
