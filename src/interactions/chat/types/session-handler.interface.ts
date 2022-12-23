// eslint-disable-next-line
// eslint-disable-next-line
import { QuestionInterface } from './question.interface';
import { SessionQuestionLogInterface } from './session-quesiton-log.interface';
import SessionStatus from './session-status.enum';

export interface SessionHandlerInterface {
  get id(): number;
  get chatId(): string;
  get lastInteraction(): Date;
  get status(): SessionStatus;
  get currentQuestion(): QuestionInterface;
  get isBusy(): boolean;
  handleQuestionAnswer(answer: string): Promise<QuestionInterface>;
  skipToQuestion(question: QuestionInterface): Promise<void>;
  setLastInteraction(timestamp: Date): Promise<void>;
  setStatus(status: SessionStatus): Promise<void>;
  triggerQuestionActions(): Promise<SessionQuestionLogInterface[]>;
  setIsBusy(isBusy: boolean): Promise<void>;
}
