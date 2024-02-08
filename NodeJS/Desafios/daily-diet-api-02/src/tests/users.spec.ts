import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../app'
import { execSync } from 'node:child_process'

describe('Users routes', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able create a user', async () => {
    await request(app.server)
      .post('/users/signUp')
      .send({
        email: 'user@example.com',
        password: '123',
      })
      .expect(201)
  })

  it('should be able login a user', async () => {
    await request(app.server).post('/users/signUp').send({
      email: 'user@example.com',
      password: '123',
    })

    await request(app.server)
      .post('/users/signIn')
      .send({
        email: 'user@example.com',
        password: '123',
      })
      .expect(200)
  })

  it('should be able get a error on signIn', async () => {
    const signInResponse = await request(app.server)
      .post('/users/signIn')
      .send({
        email: 'user@example.com',
        password: '123',
      })

    expect(signInResponse.body).toEqual(
      expect.objectContaining({
        error: 'User not exist or Email /or password incorrect!',
      }),
    )
  })
})
