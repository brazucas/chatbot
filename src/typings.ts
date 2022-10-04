export interface ChatbotClientInterface {
  initialize(): void;
  evaluateResponse(
    response: ChatDigestResponse,
    rawMessage: any
  ): Promise<void>;
}

export abstract class ChatbotClient<T> implements ChatbotClientInterface {
  protected _interactions: Interaction[] = [];

  constructor(protected readonly interactions: Interaction[]) {
    this._interactions = interactions;
  }

  protected async digestMessage(
    message: ChatMessage,
    rawMessage: T
  ): Promise<void> {
    if (process.env.DEBUG) {
      console.log(`Checking incoming message: ${message.body}`);
    }

    for (const interaction of this._interactions) {
      if (interaction.config.pattern.test(message.body)) {
        if (process.env.DEBUG) {
          console.log(`Digesting message: ${message.body}`);
        }

        const response = await interaction.digestMessage(message);

        if (process.env.DEBUG) {
          console.log(`Response:`, response);
        }

        await this.evaluateResponse(response, rawMessage);
      } else {
        if (process.env.DEBUG) {
          console.log(`Ignoring message: ${message.body}`);
        }
      }
    }
  }

  async evaluateResponse(
    response: ChatDigestResponse,
    rawMessage: T
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  initialize(): Promise<void> {
    throw new Error(
      `Client won't be initialized since method is not implemented.`
    );
  }
}

export interface InteractionInterface {
  config: InteractionConfig;
  digestMessage(message: ChatMessage): Promise<ChatDigestResponse>;
}

export enum InteractionResponseType {
  Reply,
  ReplyPrivately,
  ChatMessage,
  MediaAudio,
  Nothing,
}

export type InteractionConfig = {
  pattern: RegExp;
};

export type ChatMessage = {
  id: string;
  body: string;
  author: string;
  authorName: string;
  chatId: string;
  client: ChatbotClient<any>;
};

export type ChatDigestResponse = {
  responseType: InteractionResponseType;
  body?: string;
};

export abstract class Interaction implements InteractionInterface {
  config: InteractionConfig;

  constructor(config: InteractionConfig) {
    this.config = config;
  }

  digestMessage(message: ChatMessage): Promise<ChatDigestResponse> {
    throw new Error(
      `Message ${message} won't be digested since method is not implemented.`
    );
  }
}
