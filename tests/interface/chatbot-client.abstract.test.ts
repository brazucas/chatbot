import ChatbotClient from '@src/interface/chatbot-client.abstract';
import { InteractionResponseType } from '@src/typings';
import { MockInteraction } from '../helpers';

const loggerWarn = jest.fn();
jest.mock('@src/interactions/chat/service/logger.service', () => ({
  default: {
    getInstance: () => ({
      logger: () => ({
        warn: loggerWarn,
      }),
    }),
  },
}));

class DummyChatbotClient extends ChatbotClient<any> {}

const mockInteraction = new MockInteraction(InteractionResponseType.Nothing);

describe('ChatbotClient', () => {
  const client = new DummyChatbotClient([mockInteraction]);

  beforeEach(() => {
    loggerWarn.mockReset();
  });

  afterEach(() => {
    delete process.env.DEBUG;
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
  });

  it('should have a digestMessage method', () => {
    expect((client as any).digestMessage).toBeDefined();
  });

  it('should throw an error when calling evaluateResponse', () => {
    expect(client.evaluateResponse(null as unknown as any, null)).rejects.toThrow();
  });

  it('should throw an error when calling initialize', () => {
    expect(() => client.initialize()).toThrow();
  });

  describe('digestMessage', () => {
    it('should emit logs', async () => {
      jest.spyOn(client, 'evaluateResponse').mockImplementationOnce(async () => {});

      process.env.DEBUG = '1';

      await (client as any).digestMessage({
        id: 'id',
        body: 'test',
        author: {},
        authorName: 'Pedro Papadopolis',
        chatId: 123,
        client: {},
      }, {
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
      });

      expect(loggerWarn).toBeCalledTimes(3);
      expect(loggerWarn).toBeCalledWith(expect.stringContaining('Checking incoming message'));
      expect(loggerWarn).toBeCalledWith(expect.stringContaining('Digesting message'));
      expect(loggerWarn).toBeCalledWith(expect.stringContaining('Response'), expect.anything());
    });
  });

  it('should emit a warn when interaction test fails', async () => {
    jest.spyOn(client, 'evaluateResponse').mockImplementationOnce(async () => {});
    jest.spyOn(mockInteraction.config.pattern, 'test').mockImplementationOnce(() => false);

    process.env.DEBUG = '1';

    await (client as any).digestMessage({
      id: 'id',
      body: 'test',
      author: {},
      authorName: 'Pedro Papadopolis',
      chatId: 123,
      client: {},
    }, {
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
    });

    expect(loggerWarn).toBeCalledTimes(2);
    expect(loggerWarn).toHaveBeenLastCalledWith(expect.stringContaining('Ignoring message'));
  });
});
