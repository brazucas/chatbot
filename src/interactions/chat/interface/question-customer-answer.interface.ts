import { QuestionInterface } from "./question.interface";
import { QuestionOptionInterface } from "./question-option.interface";
import { SessionInterface } from "./session.interface";

export interface QuestionCustomerAnswerInterface {
  get id(): number;
  get createdAt(): Date;
  get question(): QuestionInterface;
  get session(): SessionInterface;
  get answerIsOption(): boolean;
  get answerOption(): QuestionOptionInterface | null;
  get text(): string;

  getAnswerAsText(): Promise<string>;
}
