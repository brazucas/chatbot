import ChatbotClient from '@src/interface/chatbot-client.abstract';

export default class MockClient extends ChatbotClient<any> {
  // eslint-disable-next-line
  async initialize() {

  }

  // eslint-disable-next-line
  async evaluateResponse(): Promise<void> {

  }
}
