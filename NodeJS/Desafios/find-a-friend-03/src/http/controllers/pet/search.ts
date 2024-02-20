import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const searchQueryParamsSchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    energy_level: z.coerce.number().optional(),
    size: z.coerce.number().optional(),
    independence_level: z.coerce.number().optional(),
    page: z.coerce.number().default(1),
  })

  const { page, ...query } = searchQueryParamsSchema.parse(req.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({ pets })
}
