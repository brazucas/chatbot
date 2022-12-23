import { QuestionActionType } from '@prisma/client';
import RequestMethod from './request-method.enum';

export interface QuestionActionInterface {
  get id(): number;
  get title(): string;
  get type(): QuestionActionType;
  get isActive(): boolean;
  get createdAt(): Date;
  get requestUrl(): string | null;
  get requestMethod(): RequestMethod | null;
  get requestHeaders(): { [key in string]: string } | null;
  get requestPayload(): { [key in string]: string } | null;
}
