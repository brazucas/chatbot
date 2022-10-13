import { QuestionInterface } from './interface/question.interface';
import { QuestionCustomerAnswerInterface } from './interface/question-customer-answer.interface';
import { SessionInterface } from './interface/session.interface';
import { SessionQuestionLogInterface } from './interface/session-quesiton-log.interface';
import SessionStatus from './interface/session-status.enum';

export default class SessionHandler implements SessionInterface {
  constructor(protected readonly session: SessionInterface) {
  }

  get id() {
    return this.session.id;
  }

  get chatId() {
    return this.session.chatId;
  }

  get lastInteraction() {
    return this.session.lastInteraction;
  }

  get status() {
    return this.session.status;
  }

  get currentQuestion() {
    return this.session.currentQuestion;
  }

  get isBusy() {
    return this.session.isBusy;
  }

  // eslint-disable-next-line
  setLastInteraction(timestamp: Date): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  storeAnswer(answer: string): Promise<QuestionCustomerAnswerInterface> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  setStatus(status: SessionStatus): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  triggerQuestionActions(): Promise<SessionQuestionLogInterface[]> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  nextQuestion(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  previousQuestion(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  skipToQuestion(question: QuestionInterface): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  setIsBusy(isBusy: boolean): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
