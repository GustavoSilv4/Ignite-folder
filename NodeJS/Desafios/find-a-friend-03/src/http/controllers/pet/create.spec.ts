import req from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await req(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Alfredo',
        about: null,
        age: '2',
        size: 2,
        energy_level: 2,
        independence_level: 5,
        environment_type: 2,
        requirements_adoption: ['Inteligente', 'Amigo'],
      })

    expect(response.statusCode).toEqual(201)
  })
})
