import * as qrcode from 'qrcode-terminal';
import WAWebJS, { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import {
  ChatDigestResponse,
  Interaction,
  InteractionResponseType,
} from '@src/typings';
import ChatbotClient from '@src/interface/chatbot-client.abstract';
import LoggerService from '@src/interactions/chat/service/logger.service';

const fiveMinutes = 300000;

export const myMention = '@61467542295';

export enum Groups {
  BRZAdmin = '1389759544@g.us',
}

export class WhatsappClient extends ChatbotClient<WAWebJS.Message> {
  constructor(
    protected readonly interactions: Interaction[],
    protected readonly loggerSvc = LoggerService.getInstance<LoggerService>(),
  ) {
    super(interactions);
  }

  initialize(): Promise<void> {
    this.loggerSvc.logger().warn('Initializing whatsapp client');

    const client = new Client({
      authStrategy: new LocalAuth(),
      authTimeoutMs: fiveMinutes,
      takeoverTimeoutMs: fiveMinutes,
      puppeteer: {
        timeout: fiveMinutes,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });

    client.on('qr', (qr) => qrcode.generate(qr, { small: true }));

    client.on('ready', async () => {
      this.loggerSvc.logger().warn('Client is ready!');
    });

    client.on('disconnected', async () => {
      this.loggerSvc.logger().warn('Client disconnected!');
    });

    client.on('auth_failure', (message) => {
      this.loggerSvc.logger().warn('Auth failure', message);
    });

    client.on('authenticated', async () => {
      this.loggerSvc.logger().warn('authenticated');
    });

    client.on('message_create', async (msg) => {
      if (msg.fromMe) {
        this.digestMessage(
          {
            // eslint-disable-next-line no-underscore-dangle
            id: msg.id._serialized,
            body: msg.body,
            author: msg.author || '',
            authorName: (await msg.getContact()).name || '',
            chatId: msg.from,
            client: this,
          },
          msg,
        );
      }
    });

    client.on('message', async (msg) => {
      this.digestMessage(
        {
          // eslint-disable-next-line no-underscore-dangle
          id: msg.id._serialized,
          body: msg.body,
          author: msg.author || '',
          authorName: (await msg.getContact()).name || '',
          chatId: msg.from,
          client: this,
        },
        msg,
      );
    });

    return client.initialize();
  }

  // eslint-disable-next-line class-methods-use-this
  async evaluateResponse(
    { body, responseType }: ChatDigestResponse,
    rawMessage: WAWebJS.Message,
  ): Promise<void> {
    if (!body) {
      throw new Error('Body is required');
    }

    let chat: WAWebJS.Chat;
    let contact: WAWebJS.Contact;

    switch (responseType) {
      case InteractionResponseType.Reply:
        await rawMessage.reply(body);
        break;
      case InteractionResponseType.ReplyPrivately:
        contact = await rawMessage.getContact();
        chat = await contact.getChat();
        chat.sendMessage(body);
        break;
      case InteractionResponseType.ChatMessage:
        chat = await rawMessage.getChat();
        chat.sendMessage(body);
        break;
      case InteractionResponseType.MediaAudio:
        rawMessage.reply(MessageMedia.fromFilePath(body));
        break;
      default:
        throw new Error('Invalid response type');
    }
  }
}
