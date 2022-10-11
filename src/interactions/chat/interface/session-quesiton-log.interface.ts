import { QuestionInterface } from "./question.interface";
import { SessionInterface } from "./session.interface";

export interface SessionQuestionLogInterface {
  get id(): number;
  get createdAt(): Date;
  get question(): QuestionInterface;
  get session(): SessionInterface;
  get httpRequestUrl(): string | null;
  get httpResponseCode(): number | null;
  get httpResponseBody(): string | null;
  get httpResponseHeaders(): { [key in string]: string } | null;
}
