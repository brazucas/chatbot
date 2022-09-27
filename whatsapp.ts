import WAWebJS, {
  Buttons,
  Client,
  ClientSession,
  List,
  LocalAuth,
  MessageMedia,
} from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";
import * as fs from "fs";
import { audioBasePath, myMention } from "./constants";
import { AUDIOS } from "./audios";

const fiveMinutes = 300000;

const existingSession = fs.existsSync("session.json");

let session: ClientSession | undefined = undefined;

const newMessagesTimestamp = new Date();

if (existingSession) {
  session = JSON.parse(
    fs.readFileSync("session.json", "utf-8")
  ) as ClientSession;
} else {
  console.log("No session found, creating new session");
}

const client = new Client({
  authStrategy: new LocalAuth(),
  authTimeoutMs: fiveMinutes,
  puppeteer: {
    timeout: fiveMinutes,
  },
  session,
});

client.on("qr", (qr) => qrcode.generate(qr, { small: true }));

client.on("ready", async () => {
  console.log("Client is ready!");

  //   const chats = await client.getChats();

  //   console.log(
  //     "Chats",
  //     chats.map((chat) => `${chat.name} - ${chat.id._serialized}`)
  //   );

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
    checkForCommands(msg);
  }
});

client.on("message", (msg) => {
  checkForCommands(msg);
});

const checkForCommands = async (msg: WAWebJS.Message) => {
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
        return msg.reply(
          "*Escolha um jagunço*\n\n" + Object.keys(AUDIOS).join("\n")
        );
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

        return msg.reply("*Escolha um áudio*\n\n" + AUDIOS[keyword].join("\n"));
      }

      if (!AUDIOS[keyword] && keyword.length >= 3) {
        console.log("Sending all found audios");

        const search = Object.values(AUDIOS)
          .flat()
          .filter((audio) =>
            audio.toLowerCase().includes(keyword.toLowerCase())
          );

        if (search.length > 1) {
          return msg.reply("*Escolha um áudio*\n\n" + search.join("\n"));
        } else if (search.length === 1) {
          const author = Object.keys(AUDIOS).find((author) =>
            AUDIOS[author].find((audio) => audio === search[0])
          );

          const audioPath = `${audioBasePath}${author}/${search[0]}`;

          if (audioPath.indexOf(".mp3") === -1) {
            return msg.reply(
              "Por enquanto só é suportado áudio em mp3, o gênio do German mandou esse arquivo em formato .wav"
            );
          }

          console.log(`Sending audio: ${audioBasePath}${author}/${search[0]}`);

          return msg.reply(
            MessageMedia.fromFilePath(`${audioBasePath}${author}/${search[0]}`)
          );
        } else {
          return msg.reply(
            `Nenhum áudio encontrado com a palavra *${keyword}*`
          );
        }
      }

      console.log("Asking for at least 3 characters");
      return msg.reply(
        "Insira pelo menos 3 caracteres para fazer uma pesquisa..."
      );
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
};

client.initialize();
