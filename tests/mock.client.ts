import { ChatbotClient, ChatDigestResponse, Interaction } from "@/typings";

export class MockClient extends ChatbotClient<any> {
  constructor(interactions: Interaction[]) {
    super(interactions);
  }

  async initialize() {
    console.log("MockClient initialized");
  }

  async evaluateResponse(
    response: ChatDigestResponse,
    rawMessage: any
  ): Promise<void> {}
}
