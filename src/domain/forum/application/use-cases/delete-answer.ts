import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'
import { NotAllowedError } from './error/not-allowed-error'

interface DeleteAnswersRequest {
  answerId: string
  authorId: string
}

type DeleteAnswersResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswersRequest): Promise<DeleteAnswersResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answerId)
    return right({})
  }
}
