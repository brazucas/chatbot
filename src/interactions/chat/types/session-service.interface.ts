import { Session } from '@prisma/client';
import SessionHandler from '../session-handler';
import { SessionHandlerInterface } from './session-handler.interface';

export interface SessionServiceInterface {
  create(chatId: string): Promise<SessionHandlerInterface>;
  find(chatId: string): Promise<SessionHandlerInterface>;
  findAll(): Promise<SessionHandlerInterface[]>;
  buildSessionHandler(session: Session): Promise<SessionHandler>;
}
