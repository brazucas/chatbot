import { QuestionInterface } from "./question.interface";
import { ServiceInterface } from "./service.interface";
import { SessionInterface } from "./session.interface";

export interface QuestionServiceInterface extends ServiceInterface {
  findFirst(session: SessionInterface): Promise<QuestionInterface>;
}
