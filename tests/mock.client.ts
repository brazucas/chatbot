import { ChatbotClient, ChatDigestResponse, Interaction } from "@/typings";

export class MockClient extends ChatbotClient<any> {
  constructor(interactions: Interaction[]) {
    super(interactions);
  }

  async initialize() {
    return;
  }

  async evaluateResponse(
    response: ChatDigestResponse,
    rawMessage: any
  ): Promise<void> {
    return;
  }
}
