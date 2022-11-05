import { QuestionServiceInterface } from '../interface/question-service.interface';
import { QuestionInterface } from '../interface/question.interface';
import ServiceInterface from '../interface/service.interface';
import { SessionHandlerInterface } from '../interface/session-handler.interface';

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
