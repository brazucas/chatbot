import { WhatsappClient } from '@whatsapp/whatsapp.client';
import WAWebJS, { Client } from 'whatsapp-web.js';
import { InteractionResponseType } from '@src/typings';
import * as qrcodeTerminal from 'qrcode-terminal';
import { mockInitialize, MockInteraction, TestableApp } from '../helpers';

const callbacks: {
  [key: string]: (message: WAWebJS.Message) => void;
} = {};
jest.mock('whatsapp-web.js', () => ({
  Client: jest.fn(() => ({
    on: jest.fn((event, callback) => {
      callbacks[event] = callback;
    }),
    triggerCallback: (event: string, message: WAWebJS.Message) => {
      callbacks[event](message);
    },
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

const loggerWarn = jest.fn();
jest.mock('@src/interactions/chat/service/logger.service', () => ({
  default: {
    logger: jest.fn(() => ({
      warn: loggerWarn,
    })),
  },
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

  it('should throw error if evaluate response with unknown type', async () => {
    spyClientEvaluateResponse.mockRestore();

    const call = client.evaluateResponse(
      { body: 'test', responseType: 'unknown' as any },
      null as unknown as WAWebJS.Message,
    );

    expect(call).rejects.toThrowError();
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

describe('Whatsapp client callbacks', () => {
  const client = new WhatsappClient([
    new MockInteraction(InteractionResponseType.MediaAudio),
  ]);

  beforeEach(() => {
    loggerWarn.mockReset();
  });

  const WAWebJSClient = new Client({});

  it('should call qr', async () => {
    const qr = jest.fn();
    const qrcodeFn = qrcodeTerminal.generate;

    await client.initialize();
    (WAWebJSClient as any).triggerCallback('qr', {
      generate: qr,
    });

    expect(loggerWarn).toBeCalledTimes(1);
    expect(qrcodeFn).toBeCalledTimes(1);
    expect(qrcodeFn).toBeCalledWith(expect.anything(), { small: true });
  });

  it('should call ready', async () => {
    await client.initialize();
    (WAWebJSClient as any).triggerCallback('ready');

    expect(loggerWarn).toBeCalledWith('Client is ready!');
  });

  it('should call disconnected', async () => {
    await client.initialize();
    (WAWebJSClient as any).triggerCallback('disconnected');

    expect(loggerWarn).toBeCalledWith('Client disconnected!');
  });

  it('should call auth_failure', async () => {
    await client.initialize();
    (WAWebJSClient as any).triggerCallback('auth_failure', 'test');

    expect(loggerWarn).toBeCalledTimes(2);
    expect(loggerWarn).toHaveBeenCalledWith('Auth failure', 'test');
  });

  it('should call authenticated', async () => {
    await client.initialize();
    (WAWebJSClient as any).triggerCallback('authenticated');

    expect(loggerWarn).toBeCalledWith('authenticated');
  });

  it('should call client digest on message_create webhook', async () => {
    const spyDigestmessage = jest.spyOn(client as any, 'digestMessage');

    await client.initialize();

    const msg = {
      fromMe: true,
      from: 'test',
      id: {
        _serialized: 'id',
      },
      body: 'body',
      author: {},
      authorName: 'authorName',
      chatId: 'chatId',
      client: {},
      getContact: jest.fn(async () => ({
        name: 'test',
      })),
    };
    await (WAWebJSClient as any).triggerCallback('message_create', msg);

    expect(spyDigestmessage).toHaveBeenLastCalledWith(expect.objectContaining({
      id: expect.anything(),
      body: expect.anything(),
      author: expect.anything(),
      authorName: expect.anything(),
      chatId: expect.anything(),
      client: expect.anything(),
    }), expect.anything());

    spyDigestmessage.mockReset();
  });

  it('shouldn\'t call client digest on message_create webhook if message not from user', async () => {
    const spyDigestmessage = jest.spyOn(client as any, 'digestMessage');

    await client.initialize();

    const msg = {
      fromMe: false,
      from: 'test',
      id: {
        _serialized: 'id',
      },
      body: 'body',
      author: {},
      authorName: 'authorName',
      chatId: 'chatId',
      client: {},
      getContact: jest.fn(async () => ({
        name: 'test',
      })),
    };
    await (WAWebJSClient as any).triggerCallback('message_create', msg);

    expect(spyDigestmessage).not.toHaveBeenCalled();
  });

  it('should call client digest on message webhook', async () => {
    const spyDigestmessage = jest.spyOn(client as any, 'digestMessage');

    await client.initialize();

    const msg = {
      fromMe: true,
      from: 'test',
      id: {
        _serialized: 'id',
      },
      body: 'body',
      author: {},
      authorName: 'authorName',
      chatId: 'chatId',
      client: {},
      getContact: jest.fn(async () => ({
        name: 'test',
      })),
    };
    await (WAWebJSClient as any).triggerCallback('message', msg);

    expect(spyDigestmessage).toHaveBeenLastCalledWith(expect.objectContaining({
      id: expect.anything(),
      body: expect.anything(),
      author: expect.anything(),
      authorName: expect.anything(),
      chatId: expect.anything(),
      client: expect.anything(),
    }), expect.anything());

    spyDigestmessage.mockReset();
  });

  it('should call client digest on message webhook with default author', async () => {
    const spyDigestmessage = jest.spyOn(client as any, 'digestMessage');

    await client.initialize();

    const msg = {
      fromMe: true,
      from: 'test',
      id: {
        _serialized: 'id',
      },
      body: 'body',
      author: null,
      authorName: 'authorName',
      chatId: 'chatId',
      client: {},
      getContact: jest.fn(async () => ({
        name: 'test',
      })),
    };
    await (WAWebJSClient as any).triggerCallback('message', msg);

    expect(spyDigestmessage).toHaveBeenLastCalledWith(expect.objectContaining({
      id: expect.anything(),
      body: expect.anything(),
      author: '',
      authorName: expect.anything(),
      chatId: expect.anything(),
      client: expect.anything(),
    }), expect.anything());

    spyDigestmessage.mockReset();
  });

  it('should call client digest on message webhook with default authorName', async () => {
    const spyDigestmessage = jest.spyOn(client as any, 'digestMessage');

    await client.initialize();

    const msg = {
      fromMe: true,
      from: 'test',
      id: {
        _serialized: 'id',
      },
      body: 'body',
      author: {},
      authorName: 'authorName',
      chatId: 'chatId',
      client: {},
      getContact: jest.fn(async () => ({
        name: null,
      })),
    };
    await (WAWebJSClient as any).triggerCallback('message', msg);

    expect(spyDigestmessage).toHaveBeenLastCalledWith(expect.objectContaining({
      id: expect.anything(),
      body: expect.anything(),
      author: expect.anything(),
      authorName: '',
      chatId: expect.anything(),
      client: expect.anything(),
    }), expect.anything());

    spyDigestmessage.mockReset();
  });

  it('should call client digest on message_create webhook with default author', async () => {
    const spyDigestmessage = jest.spyOn(client as any, 'digestMessage');

    await client.initialize();

    const msg = {
      fromMe: true,
      from: 'test',
      id: {
        _serialized: 'id',
      },
      body: 'body',
      author: null,
      authorName: 'authorName',
      chatId: 'chatId',
      client: {},
      getContact: jest.fn(async () => ({
        name: 'test',
      })),
    };
    await (WAWebJSClient as any).triggerCallback('message_create', msg);

    expect(spyDigestmessage).toHaveBeenLastCalledWith(expect.objectContaining({
      id: expect.anything(),
      body: expect.anything(),
      author: '',
      authorName: expect.anything(),
      chatId: expect.anything(),
      client: expect.anything(),
    }), expect.anything());

    spyDigestmessage.mockReset();
  });

  it('should call client digest on message_create webhook with default authorName', async () => {
    const spyDigestmessage = jest.spyOn(client as any, 'digestMessage');

    await client.initialize();

    const msg = {
      fromMe: true,
      from: 'test',
      id: {
        _serialized: 'id',
      },
      body: 'body',
      author: {},
      authorName: 'authorName',
      chatId: 'chatId',
      client: {},
      getContact: jest.fn(async () => ({
        name: null,
      })),
    };
    await (WAWebJSClient as any).triggerCallback('message_create', msg);

    expect(spyDigestmessage).toHaveBeenLastCalledWith(expect.objectContaining({
      id: expect.anything(),
      body: expect.anything(),
      author: expect.anything(),
      authorName: '',
      chatId: expect.anything(),
      client: expect.anything(),
    }), expect.anything());

    spyDigestmessage.mockReset();
  });
});
