import { execSync } from 'node:child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../app'

describe('Meals routes', () => {
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

  it('should be able create a meal', async () => {
    await request(app.server).post('/users/signUp').send({
      email: 'user@example.com',
      password: '123',
    })

    const loginResponse = await request(app.server).post('/users/signIn').send({
      email: 'user@example.com',
      password: '123',
    })

    const cookies = loginResponse.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'x-tudo',
        is_diet: false,
        date: '18/02/2024',
        hour: '16:00',
      })
      .expect(201)
  })

  it('should be able update a meal', async () => {
    await request(app.server).post('/users/signUp').send({
      email: 'user@example.com',
      password: '123',
    })

    const loginResponse = await request(app.server).post('/users/signIn').send({
      email: 'user@example.com',
      password: '123',
    })

    const cookies = loginResponse.get('Set-Cookie')

    await request(app.server).post('/meals').set('Cookie', cookies).send({
      name: 'x-lasanha',
      is_diet: false,
      date: '18/02/2024',
      hour: '16:00',
    })

    const getMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    const meal = getMealsResponse.body.meals[0]

    const updateMealResponse = await request(app.server)
      .put(`/meals/${meal.id}`)
      .set('Cookie', cookies)
      .send({
        name: 'x-salada',
        is_diet: true,
        description: 'teste',
        date: '10/02/2024',
        hour: '20:00',
      })

    expect(updateMealResponse.body).toEqual({
      updatedMeal: [
        expect.objectContaining({
          name: 'x-salada',
          description: 'teste',
          is_diet: 1,
          date: '10/02/2024',
          hour: '20:00',
        }),
      ],
    })
  })

  it('should be able list all meals', async () => {
    await request(app.server).post('/users/signUp').send({
      email: 'user@example.com',
      password: '123',
    })

    const loginResponse = await request(app.server).post('/users/signIn').send({
      email: 'user@example.com',
      password: '123',
    })

    const cookies = loginResponse.get('Set-Cookie')

    await request(app.server).post('/meals').set('Cookie', cookies).send({
      name: 'x-lasanha',
      is_diet: false,
      date: '18/02/2024',
      hour: '16:00',
    })

    const getMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
    expect(getMealsResponse.body).toEqual({
      meals: [
        expect.objectContaining({
          name: 'x-lasanha',
          is_diet: 0,
          date: '18/02/2024',
          hour: '16:00',
        }),
      ],
    })
  })

  it('should be able show a specific meal', async () => {
    await request(app.server).post('/users/signUp').send({
      email: 'user@example.com',
      password: '123',
    })

    const loginResponse = await request(app.server).post('/users/signIn').send({
      email: 'user@example.com',
      password: '123',
    })

    const cookies = loginResponse.get('Set-Cookie')

    await request(app.server).post('/meals').set('Cookie', cookies).send({
      name: 'x-lasanha',
      is_diet: false,
      date: '18/02/2024',
      hour: '16:00',
    })

    const getMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    const mealId = getMealsResponse.body.meals[0].id

    const getASpecificMealResponse = await request(app.server)
      .get(`/meals/${mealId}`)
      .set('Cookie', cookies)

    expect(getASpecificMealResponse.body).toEqual({
      meal: expect.objectContaining({
        name: 'x-lasanha',
        is_diet: 0,
        date: '18/02/2024',
        hour: '16:00',
      }),
    })
  })

  it('should be able delete a meal', async () => {
    await request(app.server).post('/users/signUp').send({
      email: 'user@example.com',
      password: '123',
    })

    const loginResponse = await request(app.server).post('/users/signIn').send({
      email: 'user@example.com',
      password: '123',
    })

    const cookies = loginResponse.get('Set-Cookie')

    await request(app.server).post('/meals').set('Cookie', cookies).send({
      name: 'x-lasanha',
      is_diet: false,
      date: '18/02/2024',
      hour: '16:00',
    })

    const getMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    const mealId = getMealsResponse.body.meals[0].id

    await request(app.server)
      .delete(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .expect(200)
  })

  it('should be able show metrics', async () => {
    await request(app.server).post('/users/signUp').send({
      email: 'user@example.com',
      password: '123',
    })

    const loginResponse = await request(app.server).post('/users/signIn').send({
      email: 'user@example.com',
      password: '123',
    })

    const cookies = loginResponse.get('Set-Cookie')

    await request(app.server).post('/meals').set('Cookie', cookies).send({
      name: 'x-lasanha',
      is_diet: false,
      date: '18/02/2024',
      hour: '16:00',
    })

    await request(app.server).post('/meals').set('Cookie', cookies).send({
      name: 'x-salada',
      is_diet: true,
      date: '10/02/2024',
      hour: '16:00',
    })

    const getMetricsResponse = await request(app.server)
      .get(`/meals/metrics`)
      .set('Cookie', cookies)

    expect(getMetricsResponse.body).toEqual({
      totalMeals: 2,
      totalMealsInDiet: 1,
      totalMealsOutDiet: 1,
      bestOnDietSequence: 1,
    })
  })
})
