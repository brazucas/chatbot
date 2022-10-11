import { QuestionInterface } from "./interface/question.interface";
import { QuestionCustomerAnswerInterface } from "./interface/question-customer-answer.interface";
import { SessionInterface } from "./interface/session.interface";
import { SessionQuestionLogInterface } from "./interface/session-quesiton-log.interface";
import { SessionStatus } from "./interface/session-status.enum";

export class SessionHandler implements SessionInterface {
  private _id: number;
  private _lastInteraction: Date;
  private _status: SessionStatus;
  private _currentQuestion: QuestionInterface;
  private _isBusy: boolean;
  private _chatId: string;

  constructor({
    id,
    chatId,
    status,
    currentQuestion,
    isBusy,
  }: SessionInterface) {
    this._id = id;
    this._chatId = chatId;
    this._lastInteraction = new Date();
    this._status = status;
    this._currentQuestion = currentQuestion;
    this._isBusy = isBusy;
  }

  get id() {
    return this._id;
  }

  get chatId() {
    return this._chatId;
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
    throw new Error("Method not implemented.");
  }

  storeAnswer(answer: string): Promise<QuestionCustomerAnswerInterface> {
    throw new Error("Method not implemented.");
  }

  setStatus(status: SessionStatus): Promise<void> {
    throw new Error("Method not implemented.");
  }

  triggerQuestionActions(): Promise<SessionQuestionLogInterface[]> {
    throw new Error("Method not implemented.");
  }

  nextQuestion(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  previousQuestion(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  skipToQuestion(question: QuestionInterface): Promise<void> {
    throw new Error("Method not implemented.");
  }

  setIsBusy(isBusy: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
