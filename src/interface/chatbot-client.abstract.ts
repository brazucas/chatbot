import {
  ChatbotClientInterface, ChatDigestResponse, ChatMessage, Interaction,
} from '@src/typings';

export default abstract class ChatbotClient<T> implements ChatbotClientInterface {
  constructor(protected readonly interactions: Interaction[]) {
  }

  protected async digestMessage(
    message: ChatMessage,
    rawMessage: T,
  ): Promise<void> {
    if (process.env.DEBUG) {
      console.log(`Checking incoming message: ${message.body}`);
    }

    this.interactions.forEach(async (interaction) => {
      if (interaction.config.pattern.test(message.body)) {
        if (process.env.DEBUG) {
          console.log(`Digesting message: ${message.body}`);
        }

        const response = await interaction.digestMessage(message);

        if (process.env.DEBUG) {
          console.log('Response:', response);
        }

        await this.evaluateResponse(response, rawMessage);
      } else if (process.env.DEBUG) {
        console.log(`Ignoring message: ${message.body}`);
      }
    });
  }

  // eslint-disable-next-line
  async evaluateResponse(
    response: ChatDigestResponse, // eslint-disable-line
    rawMessage: T, // eslint-disable-line
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  initialize(): Promise<void> {
    throw new Error(
      'Client won\'t be initialized since method is not implemented.',
    );
  }
}
