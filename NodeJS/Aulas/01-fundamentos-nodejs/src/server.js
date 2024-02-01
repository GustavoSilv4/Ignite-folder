import http from 'node:http'

const server = http.createServer((req, res) => {
  return res.end('Hello Gustavo!');
})

server.listen(3333)