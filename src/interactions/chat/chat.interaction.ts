import {
  ChatDigestResponse, ChatMessage, Interaction, InteractionResponseType,
} from '@src/typings';
import { lastValueFrom, ReplaySubject } from 'rxjs';
import { QuestionInterface } from './types/question.interface';
import { SessionHandlerInterface } from './types/session-handler.interface';
import SessionService from './service/session.service';

type Sessions = ReplaySubject<{ [key in string]: SessionHandlerInterface }>;

export default class ChatInteraction extends Interaction {
  private sessions: Sessions = new ReplaySubject();

  constructor(
    private readonly sessionSvc = SessionService.getInstance<SessionService>(),
  ) {
    super({
      pattern: /^chatbot$/,
    });

    this.loadSessions();
  }

  async digestMessage({
    body,
    chatId,
  }: ChatMessage): Promise<ChatDigestResponse> {
    const sessions = await lastValueFrom(this.sessions);

    const sessionHandler = sessions[chatId];
    let question: QuestionInterface;

    if (sessionHandler) {
      question = await sessionHandler.handleQuestionAnswer(body);
    } else {
      const newSession = await this.createSession(chatId);
      question = newSession.currentQuestion;
    }

    return {
      body: question.title,
      responseType: InteractionResponseType.Reply,
    };
  }

  private async createSession(chatId: string) {
    return this.sessionSvc.create(chatId).then(
      async (session) => {
        const allSessions = await lastValueFrom(this.sessions);

        this.sessions = new ReplaySubject();

        this.sessions.next({
          ...allSessions,
          [chatId]: session,
        });

        this.sessions.complete();

        return session;
      },
    );
  }

  private async loadSessions() {
    const sessions = await this.sessionSvc.findAll();

    this.sessions.next(sessions.reduce(
      (acc, session) => ({ ...acc, [session.chatId]: session }),
      {},
    ));

    this.sessions.complete();
  }
}
