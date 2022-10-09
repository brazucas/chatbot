import { ChatDigestResponse, ChatMessage, Interaction } from "@/typings";

export class ChatInteraction extends Interaction {
  constructor() {
    super({
      pattern: /^chatbot$/,
    });
  }

  async digestMessage({ body }: ChatMessage): Promise<ChatDigestResponse> {
    throw new Error("Method not implemented.");
  }
}
