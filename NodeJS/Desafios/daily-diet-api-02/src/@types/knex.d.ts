// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    meals: {
      id: string
      session_id?: string
      name: string
      description: string
      isDiet: boolean
      created_at: string
    }
    users: {
      id: string
      session_id: string
      email: string
      password: string
    }
  }
}
