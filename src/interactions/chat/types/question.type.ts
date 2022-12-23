import { Prisma } from '@prisma/client';
import { questionRelations } from '../service/question.service';
import { QuestionActionInterface } from './question-action.interface';
import { QuestionOptionInterface } from './question-option.interface';
import QuestionType from './question-type.enum';
import { QuestionInterface } from './question.interface';

class Question implements QuestionInterface {
  constructor(protected readonly questionEntity: Prisma.QuestionGetPayload<
    typeof questionRelations
  >) {}

  get id(): number {
    return this.questionEntity.id;
  }

  get title(): string {
    return this.questionEntity.title;
  }

  get type(): QuestionType {
    return this.questionEntity.type;
  }

  get isActive(): boolean {
    return this.questionEntity.isActive;
  }

  get createdAt(): Date {
    return this.questionEntity.createdAt;
  }

  get options(): QuestionOptionInterface[] {
    return this.questionEntity.options;
  }

  // eslint-disable-next-line
  get actions(): QuestionActionInterface[] {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  get parent(): QuestionInterface | null {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  getActions(): Promise<QuestionActionInterface[]> {
    throw new Error('Method not implemented.');
  }
}

export default Question;
