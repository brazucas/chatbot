import {
  ChatbotClient,
  ChatDigestResponse,
  Interaction,
  InteractionResponseType,
} from "@/typings";
import * as qrcode from "qrcode-terminal";
import WAWebJS, { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";

const fiveMinutes = 300000;

export const myMention = "@61467542295";

export enum Groups {
  BRZAdmin = "1389759544@g.us",
}

export class WhatsappClient extends ChatbotClient<WAWebJS.Message> {
  constructor(protected readonly interactions: Interaction[]) {
    super(interactions);
  }

  async initialize(): Promise<void> {
    console.log("Initializing whatsapp client");

    const client = new Client({
      authStrategy: new LocalAuth(),
      authTimeoutMs: fiveMinutes,
      puppeteer: {
        timeout: fiveMinutes,
      },
    });

    client.on("qr", (qr) => qrcode.generate(qr, { small: true }));

    client.on("ready", async () => {
      console.log("Client is ready!");
    });

    client.on("auth_failure", (message) => {
      console.log("Auth failure", message);
    });

    client.on("authenticated", async () => {
      console.log("authenticated");
    });

    client.on("message_create", async (msg) => {
      if (msg.fromMe) {
        this.digestMessage(
          {
            id: msg.id._serialized,
            body: msg.body,
            author: msg.author || "",
            authorName: (await msg.getContact()).name || "",
            chatId: msg.from,
            client: this,
          },
          msg
        );
      }
    });

    client.on("message", async (msg) => {
      this.digestMessage(
        {
          id: msg.id._serialized,
          body: msg.body,
          author: msg.author || "",
          authorName: (await msg.getContact()).name || "",
          chatId: msg.from,
          client: this,
        },
        msg
      );
    });

    return client.initialize();
  }

  async evaluateResponse(
    { body, responseType }: ChatDigestResponse,
    rawMessage: WAWebJS.Message
  ): Promise<void> {
    switch (responseType) {
      case InteractionResponseType.Reply:
        if (body) {
          await rawMessage.reply(body);
        } else {
          console.warn("No body provided for reply");
        }
        break;
      case InteractionResponseType.ReplyPrivately:
        if (body) {
          const contact = await rawMessage.getContact();
          const chat = await contact.getChat();
          chat.sendMessage(body);
        } else {
          console.warn("No body provided for reply");
        }
        break;
      case InteractionResponseType.ChatMessage:
        if (body) {
          const chat = await rawMessage.getChat();
          chat.sendMessage(body);
        } else {
          console.warn("No body provided for reply");
        }
        break;
      case InteractionResponseType.MediaAudio:
        if (body) {
          rawMessage.reply(MessageMedia.fromFilePath(body));
        } else {
          console.warn("No body provided for reply");
        }
        break;
    }
  }
}
