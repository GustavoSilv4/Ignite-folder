import fastify from 'fastify'
import { env } from './env'
import { knex } from './database'

const app = fastify()

app.get('/', async () => {
  const response = await knex.table('meals').insert({
    id: crypto.randomUUID(),
    name: 'teste',
    description: 'teste',
    isDiet: false,
  })

  return response
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 Server is Running')
  })
