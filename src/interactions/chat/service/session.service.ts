import { Session } from '@prisma/client';
import { SessionHandlerInterface } from '@src/interactions/chat/types/session-handler.interface';
import { SessionServiceInterface } from '../types/session-service.interface';
import SessionHandler from '../session-handler';
import AbstractService from './abstract.service';

export default class SessionService
  extends AbstractService
  implements SessionServiceInterface {
  public constructor() {
    super();
  }

  // eslint-disable-next-line
  public async create(chatId: string): Promise<SessionHandlerInterface> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  public async find(chatId: string): Promise<SessionHandlerInterface> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  public async findAll(): Promise<SessionHandlerInterface[]> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  public async buildSessionHandler(session: Session): Promise<SessionHandler> {
    throw new Error('Method not implemented.');
  }
}
