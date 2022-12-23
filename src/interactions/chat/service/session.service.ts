import { Prisma } from '@prisma/client';
import { SessionHandlerInterface } from '@src/interactions/chat/types/session-handler.interface';
import SessionHandler from '../session-handler';
import { SessionServiceInterface } from '../types/session-service.interface';
import AbstractService from './abstract.service';
import PrismaService from './prisma.service';
import QuestionService from './question.service';

export default class SessionService
  extends AbstractService
  implements SessionServiceInterface {
  readonly sessionRelations = Prisma.validator<Prisma.SessionArgs>()({
    include: {
      currentQuestion: true,
    },
  });

  public constructor(
    protected readonly prisma = PrismaService.getInstance(),
    protected readonly questionSvc = QuestionService.getInstance<QuestionService>(),
  ) {
    super();
  }

  // eslint-disable-next-line
  public async create(chatId: string): Promise<SessionHandlerInterface> {
    const firstQuestion = await this.questionSvc.findFirst();

    return this.prisma.session.create({
      ...this.sessionRelations,
      data: {
        chatId,
        customer: 'customer',
        currentQuestion: {
          connect: {
            id: firstQuestion.id,
          },
        },
      },
    }).then((session) => this.buildSessionHandler(session));
  }

  // eslint-disable-next-line
  public async find(chatId: string): Promise<SessionHandlerInterface> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line
  public async findAll(): Promise<SessionHandlerInterface[]> {
    throw new Error('Method not implemented.');
  }

  public async buildSessionHandler({
    customer,
    id,
    chatId,
    createdAt,
    currentQuestionId,
    lastInteraction,
    status,
    currentQuestion,
  }: Prisma.SessionGetPayload<
  typeof this.sessionRelations
  >): Promise<SessionHandler> {
    return new SessionHandler({
      currentQuestion: {
        createdAt: currentQuestion.createdAt,
        id: currentQuestion.id,
        isActive: currentQuestion.isActive,
        parentId: currentQuestion.parentId,
        title: currentQuestion.title,
        type: currentQuestion.type,
      },
      customer,
      id,
      chatId,
      createdAt,
      currentQuestionId,
      lastInteraction,
      status,
    });
  }
}
