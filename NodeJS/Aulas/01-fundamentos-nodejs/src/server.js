import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
// const users = [] // Stateless - Dados salvo em memoria, onde é perdido a cada restart da aplicação / Statefull - Dados são salvos de forma externa sem perda

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => route.method === method && route.path === url)

  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)