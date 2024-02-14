import { FastifyInstance } from 'fastify'
import req from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await req(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john@doe.com',
    password: '123456',
  })

  const authResponse = await req(app.server).post('/sessions').send({
    email: 'john@doe.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
