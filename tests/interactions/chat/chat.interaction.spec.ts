import ChatInteraction from '@src/interactions/chat/chat.interaction';
import ChatbotClient from '@src/interface/chatbot-client.abstract';
import { mockInitialize, TestableApp } from '../../helpers';
import MockClient from '../../mock.client';

describe('ChatInteraction', () => {
  let chatbot: TestableApp;
  let client: ChatbotClient<any>;
  let interaction: ChatInteraction;
  let spyDigestMessage: jest.SpyInstance;
  let spyClientEvaluateResponse: jest.SpyInstance;

  beforeAll(async () => {
    interaction = new ChatInteraction();
    client = new MockClient([interaction]);
    chatbot = await mockInitialize(client);
  });

  beforeEach(async () => {
    spyDigestMessage = jest.spyOn(interaction, 'digestMessage');
    spyClientEvaluateResponse = jest.spyOn(client, 'evaluateResponse');
    spyDigestMessage.mockReset();
    spyClientEvaluateResponse.mockReset();
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
    expect(chatbot).toBeDefined();
  });
});
