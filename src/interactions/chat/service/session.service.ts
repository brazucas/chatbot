import { Session } from '@prisma/client';
import { SessionHandlerInterface } from '@src/interactions/chat/interface/session-handler.interface';
import ServiceInterface from '../interface/service.interface';
import { SessionServiceInterface } from '../interface/session-service.interface';
import SessionHandler from '../session-handler';

export default class SessionService
  extends ServiceInterface
  implements SessionServiceInterface {
  private static instance: SessionService;

  private constructor() {
    super();
  }

  public static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
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
  public async buildSessionHandler(session: Session): Promise<SessionHandler> {
    throw new Error('Method not implemented.');
  }
}
