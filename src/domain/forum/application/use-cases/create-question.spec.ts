import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";

import { CreateQuestionUseCase } from "./create-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// system in memory test
let sut: CreateQuestionUseCase;

describe("Create question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a new question", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "Title a new question",
      attachmentsIds: ["1", "2"],
      content: "Describing a new content",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsRepository.items[0]).toEqual(
      result.value?.question
    );
    expect(inMemoryQuestionsRepository.items[0].attachments).toHaveLength(2);
    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
      expect.objectContaining({ attachmentId: new UniqueEntityId("2") }),
    ]);
  });
});
