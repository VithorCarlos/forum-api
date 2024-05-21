import { InMemoryAnswerRepository } from 'test/repositories/in-memory-anwsers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswerRepository
// system in memory test
let sut: AnswerQuestionUseCase

describe('Create answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create a new answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Describing a new content',
    })

    expect(answer.content).toEqual('Describing a new content')
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
  })
})
