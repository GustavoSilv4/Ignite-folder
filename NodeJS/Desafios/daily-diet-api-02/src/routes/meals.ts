import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', async (req) => {
    const createMealsBodySchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      isDiet: z.boolean(),
    })

    const { name, description, isDiet } = createMealsBodySchema.parse(req.body)

    const sessionId = req.cookies.sessionId

    const response = await knex.table('meals').insert({
      id: crypto.randomUUID(),
      name,
      description,
      isDiet,
      session_id: sessionId,
    })

    return response
  })
}
