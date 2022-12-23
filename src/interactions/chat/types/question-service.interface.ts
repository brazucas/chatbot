import { QuestionInterface } from './question.interface';
import { SessionHandlerInterface } from './session-handler.interface';

export interface QuestionServiceInterface {
  findFirst(session: SessionHandlerInterface): Promise<QuestionInterface>;
}
