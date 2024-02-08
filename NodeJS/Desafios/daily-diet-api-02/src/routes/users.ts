import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/signUp', async (req, reply) => {
    const createUserBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = createUserBodySchema.parse(req.body)

    const user = await knex.table('users').where({ email }).first()

    if (user) {
      return reply.status(409).send({ error: 'Email already exists' })
    }

    await knex.table('users').insert({
      id: crypto.randomUUID(),
      session_id: crypto.randomUUID(),
      email,
      password,
    })

    return reply.status(201).send()
  })

  app.post('/signIn', async (req, reply) => {
    const loginUserBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = loginUserBodySchema.parse(req.body)

    const user = await knex.table('users').where({ email, password }).first()

    if (!user) {
      return reply
        .status(401)
        .send({ error: 'User not exist or Email /or password incorrect!' })
    }

    reply.cookie('sessionId', user.session_id, {
      maxAge: 60 * 60 * 24, // 1 day
    })

    return reply.status(200).send()
  })
}
