import { UniqueEntityID } from '@/domain/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const newQuestion = Question.create({
    authorId: new UniqueEntityID(),
    title: 'Example Question',
    slug: Slug.create('example-question'),
    content: 'Example Content',
    ...override,
  })

  return newQuestion
}
