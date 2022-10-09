import { QuestionInterface } from './question';
import { QuestionOptionInterface } from './question-option';
import { SessionInterface } from './session';

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
