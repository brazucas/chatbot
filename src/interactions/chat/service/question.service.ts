import { Prisma } from '@prisma/client';
import { QuestionServiceInterface } from '../types/question-service.interface';
import { QuestionInterface } from '../types/question.interface';
import AbstractService from './abstract.service';

export const questionRelations = Prisma.validator<Prisma.QuestionArgs>()({
  include: {
    options: true,
    actions: true,
    parent: true,
  },
});
export default class QuestionService
  extends AbstractService
  implements QuestionServiceInterface {
  public constructor() {
    super();
  }

  // eslint-disable-next-line
  public async findFirst(): Promise<QuestionInterface> {
    throw new Error('Method not implemented.');
  }
}
