import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { checkUserIsAuthenticated } from '../middlewares/check-user-is-authenticated'

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { preHandler: [checkUserIsAuthenticated] },
    async (req, reply) => {
      const createMealsBodySchema = z.object({
        name: z.string(),
        description: z.string().optional(),
        isDiet: z.boolean(),
      })

      const { name, description, isDiet } = createMealsBodySchema.parse(
        req.body,
      )

      const sessionId = req.cookies.sessionId

      await knex.table('meals').insert({
        id: crypto.randomUUID(),
        name,
        description,
        isDiet,
        session_id: sessionId,
      })

      return reply.status(201).send()
    },
  )
}
