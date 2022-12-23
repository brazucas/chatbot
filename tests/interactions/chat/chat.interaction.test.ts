import { QuestionType, SessionStatus } from '@prisma/client';
import ChatInteraction from '@src/interactions/chat/chat.interaction';
import { QuestionInterface } from '@src/interactions/chat/types/question.interface';
import PrismaService from '@src/interactions/chat/service/prisma.service';
import SessionService from '@src/interactions/chat/service/session.service';
import SessionHandler from '@src/interactions/chat/session-handler';
import ChatbotClient from '@src/interface/chatbot-client.abstract';
import { InteractionResponseType } from '@src/typings';
import { mockInitialize, TestableApp } from '../../helpers';
import MockClient from '../../mock.client';

jest.spyOn(PrismaService.prototype, '$connect').mockImplementation(() => Promise.resolve());

describe('ChatInteraction', () => {
  let chatbot: TestableApp;
  let client: ChatbotClient<any>;
  let interaction: ChatInteraction;

  let sessionService: SessionService;

  let spyClientEvaluateResponse: jest.SpyInstance;
  let spySessionFind: jest.SpyInstance;
  let spySessionCreate: jest.SpyInstance;
  let spySessionFindAll: jest.SpyInstance;

  const sessionHandler = new SessionHandler({
    currentQuestion: {
      createdAt: new Date('2021-01-01'),
      id: 1,
      isActive: true,
      parentId: null,
      title: 'title',
      type: QuestionType.Single,
    },
    customer: 'customer',
    triggerId: 123,
    id: 1,
    chatId: 'chatId',
    createdAt: new Date('2021-01-01'),
    currentQuestionId: 1,
    lastInteraction: new Date('2021-01-01'),
    status: SessionStatus.ACTIVE,
  });

  const spySessionHandlerHandleQuestionAnswer = jest.spyOn(sessionHandler, 'handleQuestionAnswer');

  beforeEach(async () => {
    sessionService = new SessionService();
    spySessionFind = jest.spyOn(sessionService, 'find');
    spySessionCreate = jest.spyOn(sessionService, 'create');
    spySessionFindAll = jest.spyOn(sessionService, 'findAll');

    spySessionFindAll.mockResolvedValue([
      sessionHandler,
    ]);

    interaction = new ChatInteraction(sessionService);
    client = new MockClient([interaction]);
    chatbot = await mockInitialize(client);

    spyClientEvaluateResponse = jest.spyOn(client, 'evaluateResponse');
    spyClientEvaluateResponse.mockReset();
    spySessionFind.mockReset();
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
    expect(chatbot).toBeDefined();
  });

  it('should create a new session while digesting message', async () => {
    spySessionCreate.mockResolvedValueOnce(sessionHandler);

    const call = await interaction.digestMessage({
      chatId: 'nonExistent',
      body: 'hello',
      author: 'Pedro',
      authorName: 'Pedro Papadopolis',
      client: null as unknown as any,
      id: '123',
    });

    expect(call).toMatchObject(expect.objectContaining({
      responseType: InteractionResponseType.Reply,
      body: expect.any(String),
    }));

    expect(spySessionCreate).toBeCalledTimes(1);
  });

  it('should continue session when finish digesting message', async () => {
    spySessionHandlerHandleQuestionAnswer.mockResolvedValueOnce({
      title: 'title',
    } as QuestionInterface);

    const call = await interaction.digestMessage({
      chatId: 'chatId',
      body: 'hello',
      author: 'Pedro',
      authorName: 'Pedro Papadopolis',
      client: null as unknown as any,
      id: '123',
    });

    expect(call).toMatchObject(expect.objectContaining({
      responseType: InteractionResponseType.Reply,
      body: expect.any(String),
    }));

    expect(spySessionCreate).not.toBeCalled();
    expect(spySessionHandlerHandleQuestionAnswer).toBeCalledTimes(1);
  });
});
