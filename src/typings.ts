import ChatbotClient from './interface/chatbot-client.abstract';

export interface ChatbotClientInterface {
  initialize(): void;
  evaluateResponse(
    response: ChatDigestResponse,
    rawMessage: any
  ): Promise<void>;
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

  // eslint-disable-next-line
  digestMessage(message: ChatMessage): Promise<ChatDigestResponse> {
    throw new Error(
      `Message ${message} won't be digested since method is not implemented.`,
    );
  }
}
