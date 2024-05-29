import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'

interface FetchQuestionsCommentsRequest {
  page: number
  questionId: string
}

interface FetchQuestionsCommentsResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionsCommentsRequest): Promise<FetchQuestionsCommentsResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return { questionComments }
  }
}
