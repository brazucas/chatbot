import {
  ChatDigestResponse,
  ChatMessage,
  Interaction,
  InteractionResponseType,
} from "@/typings";
import { AUDIOS } from "@/audios";
import { Buttons } from "whatsapp-web.js";
import { audioBasePath } from "@/constants";

export class SoundsInteraction extends Interaction {
  constructor() {
    super({
      pattern: /^!sons( (\w.*))?$/,
    });
  }

  async digestMessage({ body }: ChatMessage): Promise<ChatDigestResponse> {
    const audioRequestRegex = this.config.pattern;
    const command = audioRequestRegex.exec(body);

    if (!command) {
      return {
        responseType: InteractionResponseType.Nothing,
      };
    }

    let [, , keyword] = command;

    if (!keyword) {
      const buttons = new Buttons(
        "Escolha um jagunço(a)",
        Object.keys(AUDIOS).map((author) => ({
          id: author,
          body: author,
        }))
      );

      return {
        responseType: InteractionResponseType.Reply,
        body: "*Escolha um jagunço*\n\n" + Object.keys(AUDIOS).join("\n"),
      };
    }

    if (AUDIOS[keyword]) {
      return {
        responseType: InteractionResponseType.Reply,
        body: "*Escolha um áudio*\n\n" + AUDIOS[keyword].join("\n"),
      };
    }

    if (!AUDIOS[keyword] && keyword.length >= 3) {
      console.log("Sending all found audios");

      const search = Object.values(AUDIOS)
        .flat()
        .filter((audio) => audio.toLowerCase().includes(keyword.toLowerCase()));

      if (search.length > 1) {
        return {
          responseType: InteractionResponseType.Reply,
          body: "*Escolha um áudio*\n\n" + search.join("\n"),
        };
      } else if (search.length === 1) {
        const author = Object.keys(AUDIOS).find((author) =>
          AUDIOS[author].find((audio) => audio === search[0])
        );

        const audioPath = `${audioBasePath}${author}/${search[0]}`;

        if (audioPath.indexOf(".mp3") === -1) {
          return {
            responseType: InteractionResponseType.Reply,
            body: "Por enquanto só é suportado áudio em mp3, o gênio do German mandou esse arquivo em formato .wav",
          };
        } else {
          console.log(`Sending audio: ${audioBasePath}${author}/${search[0]}`);

          return {
            responseType: InteractionResponseType.MediaAudio,
            body: `${audioBasePath}${author}/${search[0]}`,
          };
        }
      } else {
        return {
          responseType: InteractionResponseType.Reply,
          body: `Nenhum áudio encontrado com a palavra *${keyword}*`,
        };
      }
    } else {
      return {
        responseType: InteractionResponseType.Reply,
        body: "Insira pelo menos 3 caracteres para fazer uma pesquisa...",
      };
    }
  }
}
