import req from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Search Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await req(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: `Alfredo`,
        about: null,
        age: '2',
        size: 2,
        energy_level: 2,
        independence_level: 5,
        environment_type: 2,
        requirements_adoption: ['Inteligente', 'Amigo'],
      })

    await req(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: `Luna`,
        about: null,
        age: '6',
        size: 2,
        energy_level: 2,
        independence_level: 5,
        environment_type: 2,
        requirements_adoption: ['Inteligente', 'Amigo'],
      })

    const responseOne = await req(app.server).get('/pets/search').query({
      city: 'Rio de Janeiro',
    })

    const responseTwo = await req(app.server).get('/pets/search').query({
      city: 'Rio de Janeiro',
      age: '6',
    })

    expect(responseOne.statusCode).toEqual(200)
    expect(responseOne.body.pets).toHaveLength(2)

    expect(responseTwo.statusCode).toEqual(200)
    expect(responseTwo.body.pets).toHaveLength(1)
  })
})
