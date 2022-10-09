import { QuestionInterface } from './interface/question';
import { QuestionCustomerAnswerInterface } from './interface/question-customer-answer';
import { SessionInterface } from './interface/session';
import { SessionQuestionLogInterface } from './interface/session-quesiton-log';
import { SessionStatus } from './interface/session-status';

export class Session implements SessionInterface {
  private _id: number;

  private _lastInteraction: Date;

  private _status: SessionStatus;

  private _currentQuestion: QuestionInterface;

  private _isBusy: boolean;

  constructor({
    id,
    lastInteraction,
    status,
    currentQuestion,
    isBusy,
  }: SessionInterface) {
    this._id = id;
    this._lastInteraction = lastInteraction;
    this._status = status;
    this._currentQuestion = currentQuestion;
    this._isBusy = isBusy;
  }

  get id() {
    return this._id;
  }

  get lastInteraction() {
    return this._lastInteraction;
  }

  get status() {
    return this._status;
  }

  get currentQuestion() {
    return this._currentQuestion;
  }

  get isBusy() {
    return this._isBusy;
  }

  setLastInteraction(timestamp: Date): Promise<void> {
    throw new Error('Method not implemented.');
  }

  storeAnswer(answer: string): Promise<QuestionCustomerAnswerInterface> {
    throw new Error('Method not implemented.');
  }

  setStatus(status: SessionStatus): Promise<void> {
    throw new Error('Method not implemented.');
  }

  triggerQuestionActions(): Promise<SessionQuestionLogInterface[]> {
    throw new Error('Method not implemented.');
  }

  nextQuestion(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  previousQuestion(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  skipToQuestion(question: QuestionInterface): Promise<void> {
    throw new Error('Method not implemented.');
  }

  setIsBusy(isBusy: boolean): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
