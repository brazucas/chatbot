import { SessionInterface } from '@src/interactions/chat/interface/session.interface';
import ServiceInterface from '../interface/service.interface';
import { SessionServiceInterface } from '../interface/session-service.interface';

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
  public async create(chatId: string): Promise<SessionInterface> {
    throw new Error('Method not implemented.');
  }
}
