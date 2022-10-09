import { QuestionActionInterface } from './question-action';
import { QuestionOptionInterface } from './question-option';
import { QuestionType } from './question-type';
import { SessionInterface } from './session';

export interface QuestionInterface {
  get id(): number;
  get title(): string;
  get type(): QuestionType;
  get isActive(): boolean;
  get createdAt(): Date;
  get session(): SessionInterface;
  get options(): QuestionOptionInterface[];
  get actions(): QuestionActionInterface[];
  get parent(): QuestionInterface | null;

  getActions(): Promise<QuestionActionInterface[]>;
}
