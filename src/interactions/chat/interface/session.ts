import { QuestionInterface } from "./question";
import { QuestionCustomerAnswerInterface } from "./question-customer-answer";
import { SessionQuestionLogInterface } from "./session-quesiton-log";
import { SessionStatus } from "./session-status";

export interface SessionInterface {
  get id(): number;
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
