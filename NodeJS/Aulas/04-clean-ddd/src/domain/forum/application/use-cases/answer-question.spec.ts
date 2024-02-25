import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create a question', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
  })
})
