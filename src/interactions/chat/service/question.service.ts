import { QuestionServiceInterface } from '../types/question-service.interface';
import { QuestionInterface } from '../types/question.interface';
import ServiceInterface from '../types/service.interface';
import { SessionHandlerInterface } from '../types/session-handler.interface';

export default class QuestionService
  extends ServiceInterface
  implements QuestionServiceInterface {
  private static instance: QuestionService;

  private constructor() {
    super();
  }

  public static getInstance(): QuestionService {
    if (!QuestionService.instance) {
      QuestionService.instance = new QuestionService();
    }
    return QuestionService.instance;
  }

  // eslint-disable-next-line
  public async findFirst(
    session: SessionHandlerInterface, // eslint-disable-line
  ): Promise<QuestionInterface> {
    throw new Error('Method not implemented.');
  }
}
