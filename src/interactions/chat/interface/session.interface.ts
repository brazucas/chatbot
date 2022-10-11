import { QuestionInterface } from "./question.interface";
import { QuestionCustomerAnswerInterface } from "./question-customer-answer.interface";
import { SessionQuestionLogInterface } from "./session-quesiton-log.interface";
import { SessionStatus } from "./session-status.enum";

export interface SessionInterface {
  get id(): number;
  get chatId(): string;
  get lastInteraction(): Date;
  get status(): SessionStatus;
  get currentQuestion(): QuestionInterface;
  get isBusy(): boolean;
  storeAnswer(answer: string): Promise<QuestionCustomerAnswerInterface>;
  nextQuestion(): Promise<void>;
  previousQuestion(): Promise<void>;
  skipToQuestion(question: QuestionInterface): Promise<void>;
  setLastInteraction(timestamp: Date): Promise<void>;
  setStatus(status: SessionStatus): Promise<void>;
  triggerQuestionActions(): Promise<SessionQuestionLogInterface[]>;
  setIsBusy(isBusy: boolean): Promise<void>;
}
