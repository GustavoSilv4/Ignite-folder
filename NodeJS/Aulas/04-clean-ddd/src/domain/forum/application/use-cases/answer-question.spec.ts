import { Answer } from '../../enterprise/entities/answer'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answers-repository'

const fakeAnswerRepository: AnswerRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (_answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestions = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestions.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
