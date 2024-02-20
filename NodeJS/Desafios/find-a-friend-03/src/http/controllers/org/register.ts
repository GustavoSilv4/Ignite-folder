import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    responsible_person: z.string(),
    email: z.string().email(),
    cep: z.string(),
    city: z.string(),
    state: z.string(),
    adress: z.string(),
    contact: z.string(),
    password: z.string(),
  })

  const data = createOrgBodySchema.parse(req.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute(data)

    return reply.status(201).send({})
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
