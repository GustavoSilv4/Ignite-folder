import { Controller, Get, Query, UseGuards } from '@nestjs/common'

import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { FetchRecentQuestionsUseCase } from 'src/domain/forum/application/use-cases/fetch-recent-questions'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestion: FetchRecentQuestionsUseCase) {}

  @Get()
  async handler(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const questions = await this.fetchRecentQuestion.execute({
      page,
    })

    return {
      questions,
    }
  }
}
