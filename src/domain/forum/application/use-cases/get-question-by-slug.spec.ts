import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { GetQuestionBySlugUseCase } from './get-question-by-slug'

import { makeQuestion } from 'test/factories/make-questions'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { ResourceNotFoundError } from './error/resource-not-found-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// system in memory test
let sut: GetQuestionBySlugUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('title-a-new-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      slug: 'title-a-new-question',
    })

    expect(inMemoryQuestionsRepository.items[0].slug.value).toEqual(
      'title-a-new-question',
    )
  })

  it('should not be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('title-a-new-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'title-a-new-question-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
