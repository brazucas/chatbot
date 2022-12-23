import { QuestionInterface } from './question.interface';
import ServiceInterface from './service.interface';
import { SessionHandlerInterface } from './session-handler.interface';

export interface QuestionServiceInterface extends ServiceInterface {
  findFirst(session: SessionHandlerInterface): Promise<QuestionInterface>;
}
