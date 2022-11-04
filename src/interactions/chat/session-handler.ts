import { Prisma } from '@prisma/client';
import { QuestionCustomerAnswerInterface } from './interface/question-customer-answer.interface';
import { QuestionInterface } from './interface/question.interface';
import { SessionQuestionLogInterface } from './interface/session-quesiton-log.interface';
import SessionStatus from './interface/session-status.enum';
import { SessionInterface } from './interface/session.interface';

export const checkoutSessionRelations = Prisma.validator<Prisma.SessionArgs>()({
  include: {
    currentQuestion: true,
  },
});
export default class SessionHandler implements SessionInterface {
  constructor(protected readonly session:
  Prisma.SessionGetPayload<typeof checkoutSessionRelations>) {
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
    return this.session.status as SessionStatus;
  }

  get currentQuestion() {
    return this.session.currentQuestion as unknown as QuestionInterface;
  }

  get isBusy() {
    return this.session.id === 1;
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
