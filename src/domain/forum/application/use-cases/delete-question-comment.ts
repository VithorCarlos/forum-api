import { QuestionCommentRepository } from '../repositories/question-comment-repository'

interface DeleteQuestionCommentRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionsCommentRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentRequest): Promise<DeleteQuestionCommentResponse> {
    const questionComment =
      await this.questionsCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question commant not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.questionsCommentRepository.delete(questionComment)

    return {}
  }
}
