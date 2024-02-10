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
        is_diet: z.boolean(),
        date: z.string(),
        hour: z.string(),
      })

      const { name, description, is_diet, hour, date } =
        createMealsBodySchema.parse(req.body)

      const sessionId = req.cookies.sessionId

      await knex.table('meals').insert({
        id: crypto.randomUUID(),
        session_id: sessionId,
        name,
        description,
        is_diet,
        date,
        hour,
      })

      return reply.status(201).send()
    },
  )

  app.put(
    '/:id',
    { preHandler: [checkUserIsAuthenticated] },
    async (req, reply) => {
      const editMealBodySchema = z.object({
        name: z.string(),
        description: z.string().optional(),
        is_diet: z.boolean().optional(),
        date: z.string().optional(),
        hour: z.string().optional(),
      })

      const editMealQuerySchema = z.object({
        id: z.string().uuid(),
      })

      const { name, description, is_diet, date, hour } =
        editMealBodySchema.parse(req.body)

      const { id } = editMealQuerySchema.parse(req.params)

      const sessionId = req.cookies.sessionId

      const meal = await knex('meals')
        .where({ session_id: sessionId, id })
        .first()

      if (!meal) {
        return reply.status(404).send({ error: 'Not Found Meal' })
      }

      const updatedMeal = await knex('meals')
        .where('id', id)
        .update({
          name,
          description,
          is_diet,
          date,
          hour,
        })
        .returning('*')

      return reply.status(200).send({ updatedMeal })
    },
  )

  app.delete(
    '/:id',
    { preHandler: [checkUserIsAuthenticated] },
    async (req, reply) => {
      const queryParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = queryParamsSchema.parse(req.params)

      const sessionId = req.cookies.sessionId

      const meal = await knex('meals')
        .where({ session_id: sessionId, id })
        .first()

      if (!meal) {
        return reply.status(404).send({ error: 'Not Found Meal' })
      }

      await knex.table('meals').where('id', id).del()

      return reply.status(200).send()
    },
  )
}
