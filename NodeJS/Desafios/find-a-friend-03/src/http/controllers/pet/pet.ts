import { PetNotFoundError } from '@/use-cases/errors/pet-not-found-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function pet(req: FastifyRequest, reply: FastifyReply) {
  const petParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = petParamsSchema.parse(req.params)

  try {
    const getPetUseCase = makeGetPetUseCase()

    const { pet, requirements_adoption } = await getPetUseCase.execute({
      petId,
    })

    return reply.status(200).send({ pet: { ...pet, requirements_adoption } })
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
