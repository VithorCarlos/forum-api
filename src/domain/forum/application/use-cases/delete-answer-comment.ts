import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

interface DeleteAnswerCommentRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answersCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentResponse> {
    const answerComment =
      await this.answersCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer commant not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.answersCommentRepository.delete(answerComment)

    return {}
  }
}
