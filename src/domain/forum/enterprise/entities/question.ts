import { AggregateRoot } from "@/core/entities/aggregate-root";
import { Slug } from "./value-objects/slug";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/types/optional";
import dayjs from "dayjs";
import { QuestionAttachmentList } from "./question-attachment-list";
import { QuestionBestAnswerChosenEvent } from "../events/question-best-answer-chosen";

export interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  attachments: QuestionAttachmentList;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends AggregateRoot<QuestionProps> {
  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get slug() {
    return this.props.slug;
  }

  get attachments() {
    return this.props.attachments;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, "days") <= 3;
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat("...");
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments;
    this.touch();
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    if (bestAnswerId && bestAnswerId !== this.props.bestAnswerId) {
      this.addDomainEvent(
        new QuestionBestAnswerChosenEvent(this, bestAnswerId)
      );
    }

    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug" | "attachments">,
    id?: UniqueEntityId
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return question;
  }
}
