import { ServiceInterface } from "@/interactions/chat/interface/service.interface";
import { SessionInterface } from "@/interactions/chat/interface/session.interface";
import { SessionServiceInterface } from "../interface/session-service.interface";

export class SessionService
  extends ServiceInterface
  implements SessionServiceInterface
{
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

  public async create(chatId: string): Promise<SessionInterface> {
    throw new Error("Method not implemented.");
  }
}
