import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from 'src/domain/forum/enterprise/entities/question'
import { Slug } from 'src/domain/forum/enterprise/entities/value-objects/slug'
import { PrismaQuestionMapper } from 'src/infra/database/prisma/mappers/prisma-question-mapper'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const newQuestion = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      slug: Slug.create('example-question'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return newQuestion
}

@Injectable()
export class QuestionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestion(
    data: Partial<QuestionProps> = {},
  ): Promise<Question> {
    const question = makeQuestion(data)

    await this.prisma.question.create({
      data: PrismaQuestionMapper.toPrisma(question),
    })

    return question
  }
}
