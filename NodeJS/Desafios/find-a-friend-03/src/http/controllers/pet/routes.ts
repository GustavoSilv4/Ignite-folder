import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { pet } from './pet'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)

  app.get('/pets/search', search)
  app.get('/pet/:petId', pet)
}
