import { randomUUID } from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res.writeHead(200).end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title || !description) {
        return res.writeHead(400).end("Necessario um title e uma descrição")
      }

      const newTask = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('tasks', newTask)

      return res.writeHead(201).end(JSON.stringify(newTask))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title || !description) {
        return res.writeHead(400).end("Necessario um title e uma descrição")
      }

      const data = database.update('tasks', id, { title, description })

      if (data === "ID NOT FOUND") {
        return res.writeHead(404).end('ID NÃO ENCONTRADO');
      }

      res.writeHead(202).end(JSON.stringify(data));
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const data = database.delete('tasks', id)

      if (data === "ID NOT FOUND") {
        return res.writeHead(404).end('ID NÃO ENCONTRADO');
      }

      return res.writeHead(202).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const data = database.updateComplete('tasks', id)

      if (data === "ID NOT FOUND") {
        return res.writeHead(404).end('ID NÃO ENCONTRADO');
      }

      return res.writeHead(204).end();
    }
  },
]