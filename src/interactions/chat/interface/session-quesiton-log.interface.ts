export interface SessionQuestionLogInterface {
  get id(): number;
  get createdAt(): Date;
  get httpRequestUrl(): string | null;
  get httpResponseCode(): number | null;
  get httpResponseBody(): string | null;
  get httpResponseHeaders(): { [key in string]: string } | null;
}
