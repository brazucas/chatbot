import { QuestionActionInterface } from './question-action.interface';
import { QuestionOptionInterface } from './question-option.interface';
import QuestionType from './question-type.enum';
// eslint-disable-next-line
import { SessionInterface } from './session.interface';

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
