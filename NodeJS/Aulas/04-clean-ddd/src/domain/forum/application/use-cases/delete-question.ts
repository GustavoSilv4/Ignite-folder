import { Either, left, right } from '@/domain/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<string, object>

export class DeleteQuestionUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) return left('Question not found.')

    if (authorId !== question.authorId.toString()) return left('Not Allowed')

    await this.questionsRepository.delete(question)

    return right({})
  }
}
