import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest) {
  const createOrgBodySchema = z.object({
    responsible_person: z.string(),
    email: z.string().email(),
    cep: z.string(),
    adress: z.string(),
    contact: z.string(),
    password: z.string(),
  })

  const data = createOrgBodySchema.parse(req.body)
}
