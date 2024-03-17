import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { DeleteAnswerCommentUseCase } from 'src/domain/forum/application/use-cases/delete-answer-comment'

@Controller('/answers/comments/:answerCommentId')
export class DeleteAnswerCommentController {
  constructor(private deleteAnswerComment: DeleteAnswerCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handler(
    @CurrentUser() user: UserPayload,
    @Param('answerCommentId') answerCommentId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteAnswerComment.execute({
      authorId: userId,
      answerCommentId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
