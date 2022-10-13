import ServiceInterface from './service.interface';
import { SessionInterface } from './session.interface';

export interface SessionServiceInterface extends ServiceInterface {
  create(chatId: string): Promise<SessionInterface>;
}
