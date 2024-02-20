import { FastifyInstance } from 'fastify'
import req from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await req(app.server).post('/orgs').send({
    responsible_person: 'Gustavo',
    email: 'gustavo@gmail.com',
    password: '123456',
    cep: '12 345 678',
    city: 'Rio de Janeiro',
    state: 'RJ',
    adress: 'av.mario roberto',
    contact: '21973392712',
  })

  const authResponse = await req(app.server).post('/orgs/sessions').send({
    email: 'gustavo@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
