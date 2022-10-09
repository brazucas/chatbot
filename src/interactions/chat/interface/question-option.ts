import { QuestionInterface } from "./question";

export interface QuestionOptionInterface {
  get id(): number;
  get title(): string;
  get isActive(): boolean;
  get createdAt(): Date;
  get question(): QuestionInterface;
}
