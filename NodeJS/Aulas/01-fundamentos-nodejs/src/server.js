import http from 'node:http'

const users = [] // Stateless - Dados salvo em memoria, onde é perdido a cada restart da aplicação / Statefull - Dados são salvos de forma externa sem perda

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {

    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: "John.Doe@gmail.com"
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)