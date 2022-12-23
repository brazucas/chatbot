import ChatbotClient from '@src/interface/chatbot-client.abstract';
import {
  ChatDigestResponse,
  ChatMessage,
  Interaction,
  InteractionResponseType,
} from '@src/typings';

export type TestableApp = {
  sendMessage(message: string | null, rawMesssage?: any): Promise<void>;
};

export const mockInitialize = (
  client: ChatbotClient<any>,
): Promise<TestableApp> => (async () => {
  await client.initialize();

  return {
    sendMessage(message: string | null, rawMessage = { id: '123' }) {
      return (client as any).digestMessage(
        {
          id: '123',
          body: message,
          author: '123',
          authorName: 'Pedro Papadopolis',
          chatId: '123',
          client,
        },
        rawMessage,
      );
    },
  };
})();

export class MockInteraction extends Interaction {
  constructor(protected readonly responseType: InteractionResponseType) {
    super({
      pattern: /^(test|no body)$/,
    });
  }

  async digestMessage({ body }: ChatMessage): Promise<ChatDigestResponse> {
    return {
      responseType: this.responseType,
      body: body === 'no body' ? undefined : body,
    };
  }
}
