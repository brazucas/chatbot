import * as qrcode from "qrcode-terminal";
import WAWebJS, {
  Buttons,
  Client, LocalAuth,
  MessageMedia
} from "whatsapp-web.js";
import { ChatbotListener } from "../../main";
import { AUDIOS } from "./audios";
import { audioBasePath } from "./constants";

const fiveMinutes = 300000;

const newMessagesTimestamp = new Date();

export class WhatsappClient implements ChatbotListener<WAWebJS.Message> {
  initialize(): void {
    console.log('Initializing whatsapp client');
    
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
  
      const chat = await client.getChatById("558699856170-1389759544@g.us");
    
      if (chat) {
        console.log("Chat found");
        const messages = await chat.fetchMessages({
          limit: 10,
        });
    
        console.log(
          "Messages",
          messages.map((message) => message.body)
        );
      } else {
        console.log("Chat not found");
      }
    });
    
    client.on("auth_failure", (message) => {
      console.log("Auth failure", message);
    });
    
    client.on("authenticated", async () => {
      console.log("authenticated");
    });
    
    client.on("message_create", (msg) => {
      if (msg.fromMe) {
        this.onMessage(msg);
      }
    });
    
    client.on("message", (msg) => {
      this.onMessage(msg);
    });
    
    client.initialize();
  }

  onMessage(msg: WAWebJS.Message): void {
    console.log(">>> ", msg);
    if (new Date(msg.timestamp * 1000) > newMessagesTimestamp) {
      const audioRequestRegex = new RegExp(/^!sons( (\w.*))?/);
      if (audioRequestRegex.test(msg.body)) {
        const command = audioRequestRegex.exec(msg.body);
  
        if (!command) {
          return;
        }
  
        let [, , keyword] = command;
  
        if (!keyword) {
          console.log("Sending all authors");
          // const buttons = new Buttons(
          //   "Escolha um jagunço(a)",
          //   Object.keys(AUDIOS).map((author) => ({
          //     id: author,
          //     body: author,
          //   }))
          // );
          // return msg.reply(buttons);
  
          // const list = new List("Escolha um jagunço(a)", "Lista", [
          //   Object.keys(AUDIOS).map((author) => ({
          //     id: author,
          //     body: author,
          //   })),
          // ]);
  
          // msg.reply(list);
  
          const buttons = new Buttons(
            "Escolha um jagunço(a)",
            Object.keys(AUDIOS).map((author) => ({
              id: author,
              body: author,
            }))
          );

          msg.reply(
            "*Escolha um jagunço*\n\n" + Object.keys(AUDIOS).join("\n")
          );
          return;
        }
  
        console.log("Looking for ", `!${keyword}!`);
        if (AUDIOS[keyword]) {
          console.log("Sending all author's audios");
          // const buttons = new Buttons(
          //   "Escolha um áudio",
          //   AUDIOS[author].map((audio) => ({
          //     id: audio,
          //     body: audio,
          //   }))
          // );
          // return msg.reply(buttons);
  
          msg.reply("*Escolha um áudio*\n\n" + AUDIOS[keyword].join("\n"));
          return;
        }
  
        if (!AUDIOS[keyword] && keyword.length >= 3) {
          console.log("Sending all found audios");
  
          const search = Object.values(AUDIOS)
            .flat()
            .filter((audio) =>
              audio.toLowerCase().includes(keyword.toLowerCase())
            );
  
          if (search.length > 1) {
            msg.reply("*Escolha um áudio*\n\n" + search.join("\n"));
          } else if (search.length === 1) {
            const author = Object.keys(AUDIOS).find((author) =>
              AUDIOS[author].find((audio) => audio === search[0])
            );
  
            const audioPath = `${audioBasePath}${author}/${search[0]}`;
  
            if (audioPath.indexOf(".mp3") === -1) {
              msg.reply(
                "Por enquanto só é suportado áudio em mp3, o gênio do German mandou esse arquivo em formato .wav"
              );
            } else {
              console.log(`Sending audio: ${audioBasePath}${author}/${search[0]}`);
              
              msg.reply(
                MessageMedia.fromFilePath(`${audioBasePath}${author}/${search[0]}`)
              );
            }
          } else {
            msg.reply(
              `Nenhum áudio encontrado com a palavra *${keyword}*`
            );
          }
        } else {
          console.log("Asking for at least 3 characters");
          msg.reply(
            "Insira pelo menos 3 caracteres para fazer uma pesquisa..."
          );
        }
      }
  
      if (msg.body.indexOf("!enquete") !== -1) {
        msg.reply({
          body: "Eleições desse ano",
          buttons: [
            {
              buttonId: "lula",
              buttonText: {
                displayText: "Lula",
              },
              type: 1,
            },
            {
              buttonId: "bolsonaro",
              buttonText: {
                displayText: "Bolsonaro",
              },
              type: 1,
            },
          ],
        });
      }
    }
  }
}