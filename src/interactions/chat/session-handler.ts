import { Prisma } from '@prisma/client';
import { QuestionInterface } from './interface/question.interface';
import { SessionHandlerInterface } from './interface/session-handler.interface';
import { SessionQuestionLogInterface } from './interface/session-quesiton-log.interface';
import SessionStatus from './interface/session-status.enum';

export const sessionRelations = Prisma.validator<Prisma.SessionArgs>()({
  include: {
    currentQuestion: true,
  },
});
export default class SessionHandler implements SessionHandlerInterface {
  constructor(protected readonly session:
  Prisma.SessionGetPayload<typeof sessionRelations>) {
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
  setLastInteraction(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  handleQuestionAnswer(): Promise<QuestionInterface> {
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
  skipToQuestion(question: QuestionInterface): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  setIsBusy(isBusy: boolean): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
