import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const checkInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(req.body)

  const { gymId } = checkInParamsSchema.parse(req.params)

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({
    userId: req.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
