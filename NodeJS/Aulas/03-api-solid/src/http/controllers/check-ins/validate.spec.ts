import req from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validade CheckIns (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Python Gym',
        description: 'aLOO',
        phone: '1234-567',
        latitude: -22.967116,
        longitude: -43.705902,
      },
    })

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await req(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
