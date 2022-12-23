import { QuestionType, SessionStatus } from '@prisma/client';
import SessionHandler from '@src/interactions/chat/session-handler';

describe('SessionHandler', () => {
  const sessionHandler = new SessionHandler({
    chatId: '1',
    createdAt: new Date(),
    currentQuestion: {
      createdAt: new Date(),
      id: 1,
      isActive: true,
      parentId: null,
      title: 'test',
      type: QuestionType.Single,
    },
    currentQuestionId: 1,
    id: 1,
    customer: '1',
    lastInteraction: new Date(),
    status: SessionStatus.ACTIVE,
  });

  it('should be defined', () => {
    expect(sessionHandler).toBeDefined();
  });
});
