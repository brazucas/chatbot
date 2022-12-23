import { QuestionInterface } from './question.interface';

export interface QuestionServiceInterface {
  findFirst(): Promise<QuestionInterface>;
}
