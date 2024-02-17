import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/org/routes'

export const app = fastify()

app.register(orgsRoutes)
