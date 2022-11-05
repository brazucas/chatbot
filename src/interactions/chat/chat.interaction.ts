import { ChatDigestResponse, ChatMessage, Interaction } from '@src/typings';
import { SessionHandlerInterface } from './interface/session-handler.interface';
import SessionService from './service/session.service';

export default class ChatInteraction extends Interaction {
  private sessions: SessionHandlerInterface[] = [];

  constructor() {
    super({
      pattern: /^chatbot$/,
    });
  }

  // eslint-disable-next-line
  async digestMessage({
    body, // eslint-disable-line
    chatId, // eslint-disable-line
  }: ChatMessage): Promise<ChatDigestResponse> {
    throw new Error('Method not implemented.');
  }

  private async loadSessions(chatId: string) {
    const find = this.sessions.find((session) => session.chatId === chatId);

    if (!find) {
      const session = await SessionService.getInstance().create(chatId);
      this.sessions.push(session);
    }
  }
}
