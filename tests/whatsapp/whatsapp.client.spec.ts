import { WhatsappClient } from '@whatsapp/whatsapp.client';
import WAWebJS from 'whatsapp-web.js';
import { InteractionResponseType } from '@src/typings';
import { mockInitialize, MockInteraction, TestableApp } from '../helpers';

jest.mock('whatsapp-web.js', () => ({
  Client: jest.fn(() => ({
    on: jest.fn(),
    initialize: jest.fn(),
  })),
  LocalAuth: jest.fn(),
  MessageMedia: {
    fromFilePath: jest.fn(() => ({
      mimetype: 'image/png',
      data: 'XXX',
      filename: '',
      fromFilePath: jest.fn(),
      fromUrl: jest.fn(),
    })),
  },
  WAWebJS: jest.fn(() => ({
    Message: jest.fn(() => ({
      reply: jest.fn(),
    })),
  })),
}));

jest.mock('qrcode-terminal', () => ({
  generate: jest.fn(),
}));

describe('WhatsappClient Reply', () => {
  let chatbot: TestableApp;
  const client = new WhatsappClient([
    new MockInteraction(InteractionResponseType.Reply),
  ]);
  let spyClientEvaluateResponse: jest.SpyInstance;
  let spyDigestmessage: jest.SpyInstance;
  let spyInitialize: jest.SpyInstance;

  beforeAll(async () => {
    spyInitialize = jest.spyOn(client, 'initialize');
    spyDigestmessage = jest.spyOn(client as any, 'digestMessage');
    spyClientEvaluateResponse = jest.spyOn(client, 'evaluateResponse');

    chatbot = await mockInitialize(client);
  });

  beforeEach(async () => {
    spyClientEvaluateResponse.mockReset();
    spyDigestmessage.mockReset();
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
  });

  it('should initialize client', async () => {
    expect(spyInitialize).toBeCalledTimes(1);
  });

  it('should evaluate response', async () => {
    spyDigestmessage.mockRestore();

    await chatbot.sendMessage('test');

    expect(spyClientEvaluateResponse).toBeCalledWith(
      expect.objectContaining({
        responseType: InteractionResponseType.Reply,
      }),
      expect.anything(),
    );
  });

  it('should fail evaluate response with no body', async () => {
    spyClientEvaluateResponse.mockRestore();

    const call = client.evaluateResponse(
      { body: undefined, responseType: InteractionResponseType.Reply },
      null as unknown as WAWebJS.Message,
    );

    expect(call).rejects.toThrowError();
  });

  it('should reply to message', async () => {
    spyDigestmessage.mockRestore();
    spyClientEvaluateResponse.mockRestore();

    const rawMessage = {
      reply: jest.fn(),
      getContact: jest.fn(() => ({
        getChat: jest.fn(() => ({
          sendMessage: jest.fn(),
        })),
      })),
      getChat: jest.fn(() => ({
        sendMessage: jest.fn(),
      })),
    };

    const spyRawMessageReply = jest.spyOn(rawMessage, 'reply');

    await chatbot.sendMessage('test', rawMessage);

    expect(spyRawMessageReply).toBeCalledTimes(1);
  });
});

describe('WhatsappClient reply privately', () => {
  let chatbot: TestableApp;
  const client = new WhatsappClient([
    new MockInteraction(InteractionResponseType.ReplyPrivately),
  ]);

  beforeAll(async () => {
    chatbot = await mockInitialize(client);
  });

  it('should reply privately', async () => {
    const sendMessage = jest.fn();

    const rawMessage = {
      reply: jest.fn(),
      getContact: jest.fn(() => ({
        getChat: jest.fn(() => ({
          sendMessage,
        })),
      })),
      getChat: jest.fn(() => ({
        sendMessage: jest.fn(),
      })),
    };

    await chatbot.sendMessage('test', rawMessage);

    expect(sendMessage).toBeCalledTimes(1);
  });
});

describe('WhatsappClient reply to chat', () => {
  let chatbot: TestableApp;
  const client = new WhatsappClient([
    new MockInteraction(InteractionResponseType.ChatMessage),
  ]);

  beforeAll(async () => {
    chatbot = await mockInitialize(client);
  });

  it('should reply to chat', async () => {
    const sendMessage = jest.fn();

    const rawMessage = {
      reply: jest.fn(),
      getChat: jest.fn(() => ({
        sendMessage,
      })),
    };

    await chatbot.sendMessage('test', rawMessage);

    expect(sendMessage).toBeCalledTimes(1);
  });
});

describe('WhatsappClient send audio media', () => {
  let chatbot: TestableApp;
  const client = new WhatsappClient([
    new MockInteraction(InteractionResponseType.MediaAudio),
  ]);

  beforeAll(async () => {
    chatbot = await mockInitialize(client);
  });

  it('should send audio media', async () => {
    const reply = jest.fn();

    const rawMessage = {
      reply,
    };

    await chatbot.sendMessage('test', rawMessage);

    expect(reply).toBeCalledWith(
      expect.objectContaining({
        mimetype: expect.anything(),
        data: expect.anything(),
        filename: expect.anything(),
        fromFilePath: expect.anything(),
        fromUrl: expect.anything(),
      }),
    );
  });
});
