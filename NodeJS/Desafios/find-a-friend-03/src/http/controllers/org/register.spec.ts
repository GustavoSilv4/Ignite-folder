import req from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an org', async () => {
    const response = await req(app.server).post('/orgs').send({
      responsible_person: 'Gustavo',
      email: 'gustavo@gmail.com',
      password: '123456',
      cep: '12 345 678',
      city: 'Rio de Janeiro',
      state: 'RJ',
      adress: 'av.mario roberto',
      contact: '21973392712',
    })

    expect(response.statusCode).toEqual(201)
  })
})
