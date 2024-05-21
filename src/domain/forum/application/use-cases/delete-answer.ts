import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswersRequest {
  answerId: string
  authorId: string
}

interface DeleteAnswersResponse {}

export class DeleteAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswersRequest): Promise<DeleteAnswersResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answersRepository.delete(answerId)
    return {}
  }
}
