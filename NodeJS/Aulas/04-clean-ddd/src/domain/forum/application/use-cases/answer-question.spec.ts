import { InMemoryAnswerRepository } from '@/test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let answerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(answerRepository)
  })

  it('should be able to create a question', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    })

    expect(answer.id).toBeTruthy()
    expect(answerRepository.items[0].id).toEqual(answer.id)
  })
})
