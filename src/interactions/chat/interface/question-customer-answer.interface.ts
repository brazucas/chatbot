// eslint-disable-next-line
import { QuestionInterface } from './question.interface';
import { QuestionOptionInterface } from './question-option.interface';
// eslint-disable-next-line
import { SessionHandlerInterface } from './session-handler.interface';

export interface QuestionCustomerAnswerInterface {
  get id(): number;
  get createdAt(): Date;
  get question(): QuestionInterface;
  get session(): SessionHandlerInterface;
  get answerIsOption(): boolean;
  get answerOption(): QuestionOptionInterface | null;
  get text(): string;

  getAnswerAsText(): Promise<string>;
}
