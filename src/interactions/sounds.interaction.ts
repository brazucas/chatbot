import { AUDIOS } from '@/audios';
import { audioBasePath } from '@/constants';
import {
  ChatDigestResponse,
  ChatMessage,
  Interaction,
  InteractionResponseType,
} from '@/typings';

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

    const [, , keyword] = command;

    if (!keyword) {
      return {
        responseType: InteractionResponseType.Reply,
        body: `*Escolha um jagunço*\n\n${Object.keys(AUDIOS).join('\n')}`,
      };
    }

    if (AUDIOS[keyword]) {
      return {
        responseType: InteractionResponseType.Reply,
        body: `*Escolha um áudio*\n\n${AUDIOS[keyword].join('\n')}`,
      };
    }

    if (!AUDIOS[keyword] && keyword.length >= 3) {
      const search = Object.values(AUDIOS)
        .flat()
        .filter((audio) => audio.toLowerCase().includes(keyword.toLowerCase()));

      if (search.length > 1) {
        return {
          responseType: InteractionResponseType.Reply,
          body: `*Escolha um áudio*\n\n${search.join('\n')}`,
        };
      } if (search.length === 1) {
        const author = Object.keys(AUDIOS).find((author) => AUDIOS[author].find((audio) => audio === search[0]));

        const audioPath = `${audioBasePath}${author}/${search[0]}`;

        if (audioPath.indexOf('.mp3') === -1) {
          return {
            responseType: InteractionResponseType.Reply,
            body: 'Por enquanto só é suportado áudio em mp3, o gênio do German mandou esse arquivo em formato .wav',
          };
        }
        return {
          responseType: InteractionResponseType.MediaAudio,
          body: `${audioBasePath}${author}/${search[0]}`,
        };
      }
      return {
        responseType: InteractionResponseType.Reply,
        body: `Nenhum áudio encontrado com a palavra *${keyword}*`,
      };
    }
    return {
      responseType: InteractionResponseType.Reply,
      body: 'Insira pelo menos 3 caracteres para fazer uma pesquisa...',
    };
  }
}
