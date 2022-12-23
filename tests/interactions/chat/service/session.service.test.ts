import { QuestionType } from '@prisma/client';
import PrismaService from '@src/interactions/chat/service/prisma.service';
import QuestionService from '@src/interactions/chat/service/question.service';
import SessionService from '@src/interactions/chat/service/session.service';
import SessionHandler from '@src/interactions/chat/session-handler';
import Question from '@src/interactions/chat/types/question.type';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn(),
    session: {
      create: () => {},
    },
  })),
  Prisma: {
    validator: jest.fn(() => jest.fn()),
  },
  QuestionType: {
    Single: 'Single',
  },
}));

describe('SessionService', () => {
  let spyPrismaSessionCreate: jest.SpyInstance;
  let spyQuestionFindFirst: jest.SpyInstance;

  let prismaSvc: PrismaService;
  let questionSvc: QuestionService;

  beforeAll(() => {
    prismaSvc = new PrismaService();
    questionSvc = new QuestionService();

    spyPrismaSessionCreate = jest.spyOn(prismaSvc.session, 'create').mockReturnValue(Promise.resolve(({
      chatId: '123',
      createdAt: new Date('2021-01-01'),
      currentQuestionId: 123,
      currentQuestion: {
        id: 123,
        type: QuestionType.Single,
        options: [],
        actions: [],
        parent: null,
        parentId: null,
        createdAt: new Date('2021-01-01'),
        isActive: true,
        title: 'test',
      },
      customer: 'customer',
      id: 123,
      lastInteraction: new Date('2021-01-01'),
      status: 'status',
    })) as any);

    spyQuestionFindFirst = jest.spyOn(questionSvc, 'findFirst').mockReturnValue(Promise.resolve(new Question({
      id: 123,
      type: QuestionType.Single,
      options: [],
      actions: [],
      parent: null,
      parentId: null,
      createdAt: new Date('2021-01-01'),
      isActive: true,
      title: 'test',
    })));
  });

  it('should be a singleton', () => {
    const instance1 = SessionService.getInstance();
    const instance2 = SessionService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should create a session', async () => {
    const sessionService = new SessionService(prismaSvc);
    const session = await sessionService.create('123');

    expect(session).toBeInstanceOf(SessionHandler);
    expect(spyQuestionFindFirst).toBeCalledTimes(1);
    expect(spyPrismaSessionCreate).toBeCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        chatId: '123',
      }),
    }));
  });
});
