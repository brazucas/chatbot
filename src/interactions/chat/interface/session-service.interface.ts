import { Session } from '@prisma/client';
import SessionHandler from '../session-handler';
import ServiceInterface from './service.interface';
import { SessionHandlerInterface } from './session-handler.interface';

export interface SessionServiceInterface extends ServiceInterface {
  create(chatId: string): Promise<SessionHandlerInterface>;
  find(chatId: string): Promise<SessionHandlerInterface>;
  buildSessionHandler(session: Session): Promise<SessionHandler>;
}
