import { prisma } from '@/lib/prisma'
import bcryptjs from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import req from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role?: 'ADMIN' | 'MEMBER',
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await bcryptjs.hash('123456', 6),
      role,
    },
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
