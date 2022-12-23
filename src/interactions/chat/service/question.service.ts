import { QuestionServiceInterface } from '../types/question-service.interface';
import { QuestionInterface } from '../types/question.interface';
import { SessionHandlerInterface } from '../types/session-handler.interface';
import AbstractService from './abstract.service';

export default class QuestionService
  extends AbstractService
  implements QuestionServiceInterface {
  private constructor() {
    super();
  }

  // eslint-disable-next-line
  public async findFirst(
    session: SessionHandlerInterface, // eslint-disable-line
  ): Promise<QuestionInterface> {
    throw new Error('Method not implemented.');
  }
}
