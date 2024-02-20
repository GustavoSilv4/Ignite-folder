import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string().nullable(),
    age: z.string(),
    size: z.number(),
    energy_level: z.number(),
    independence_level: z.number(),
    environment_type: z.number(),
    requirements_adoption: z.string().array(),
  })

  const data = createPetBodySchema.parse(req.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    const orgId = req.user.sub

    await registerPetUseCase.execute({ ...data, org_id: orgId })

    return reply.status(201).send({})
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
