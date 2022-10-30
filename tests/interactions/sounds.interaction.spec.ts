import MockClient from 'tests/mock.client';
import audioBasePath from '@src/constants';
import SoundsInteraction from '@src/interactions/sounds.interaction';
import ChatbotClient from '@src/interface/chatbot-client.abstract';
import { InteractionResponseType } from '@src/typings';
import { mockInitialize, TestableApp } from '../helpers';

jest.mock('@src/audios', () => ({
  __esModule: true,
  AUDIOS: {
    CHUUNAS: [
      'tomar vicvaporube chunas.wav',
      'AAAI MDS CHUNAS.wav',
      'eu to tiltado chunas.wav',
      'ngm ta de hack chunas.wav',
      'ja to tiltado chunas.wav',
      'esses caras eh gado chunas.wav',
      'cara chato chunas.wav',
      'assinar é meu cu chunas.wav',
      'krl pedro chunas.wav',
      'esqueceu q sou gado chunas.wav',
      'ngm vai rir agora chunas.wav',
      'esse cara impossivel chunas.wav',
      'chunas tiltado.wav',
      'gadar chunas.wav',
      'calma krl chunas.wav',
      'testingtesting.mp3',
    ],
  },
}));

describe('SoundsInteraction', () => {
  let chatbot: TestableApp;
  let client: ChatbotClient<any>;
  let interaction: SoundsInteraction;
  let spyDigestMessage: jest.SpyInstance;
  let spyClientEvaluateResponse: jest.SpyInstance;

  beforeAll(async () => {
    interaction = new SoundsInteraction();
    client = new MockClient([interaction]);
    chatbot = await mockInitialize(client);
  });

  beforeEach(async () => {
    spyDigestMessage = jest.spyOn(interaction, 'digestMessage');
    spyClientEvaluateResponse = jest.spyOn(client, 'evaluateResponse');
    spyDigestMessage.mockReset();
    spyClientEvaluateResponse.mockReset();
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
  });

  it('should digest !sons message', async () => {
    await chatbot.sendMessage('!sons');
    expect(spyDigestMessage).toBeCalledTimes(1);
    expect(spyClientEvaluateResponse).toBeCalledTimes(1);
  });

  it('should digest !sons heh g message', async () => {
    await chatbot.sendMessage('!sons heh g');
    expect(spyDigestMessage).toBeCalledTimes(1);
  });

  it('should digest Mandrakke message', async () => {
    await chatbot.sendMessage('!sons Mandrakke');
    expect(spyDigestMessage).toBeCalledTimes(1);
    expect(spyClientEvaluateResponse).toBeCalledTimes(1);
  });

  it('should NOT digest message', async () => {
    await chatbot.sendMessage(' !sons Mandrakke');
    await chatbot.sendMessage('sons Mandrakke');
    await chatbot.sendMessage('!sonss');
    await chatbot.sendMessage('!meussons');
    await chatbot.sendMessage('!ossons');
    expect(spyDigestMessage).not.toBeCalled();
    expect(spyClientEvaluateResponse).not.toBeCalled();
  });

  it("should return all author's list", async () => {
    spyDigestMessage.mockRestore();
    await chatbot.sendMessage('!sons');
    expect(spyClientEvaluateResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        responseType: InteractionResponseType.Reply,
        body: expect.stringContaining('Escolha um jagunço'),
      }),
      expect.anything(),
    );
    expect(spyClientEvaluateResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        responseType: InteractionResponseType.Reply,
        body: expect.stringContaining('CHUUNAS'),
      }),
      expect.anything(),
    );
  });

  it("should return list of author's sounds", async () => {
    spyDigestMessage.mockRestore();
    await chatbot.sendMessage('!sons CHUUNAS');
    expect(spyClientEvaluateResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        responseType: InteractionResponseType.Reply,
        body: expect.stringContaining('Escolha um áudio'),
      }),
      expect.anything(),
    );
    expect(spyClientEvaluateResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        responseType: InteractionResponseType.Reply,
        body: expect.stringContaining('tomar vicvaporube chunas.wav'),
      }),
      expect.anything(),
    );
  });

  it('should return an executable audio path', async () => {
    spyDigestMessage.mockRestore();
    await chatbot.sendMessage('!sons testingtesting');
    expect(spyClientEvaluateResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        responseType: InteractionResponseType.MediaAudio,
        body: expect.stringContaining(
          `${audioBasePath}CHUUNAS/testingtesting.mp3`,
        ),
      }),
      expect.anything(),
    );
  });

  it('should find no audios with given keyword', async () => {
    spyDigestMessage.mockRestore();
    await chatbot.sendMessage('!sons random keyword');
    expect(spyClientEvaluateResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        responseType: InteractionResponseType.Reply,
        body: expect.stringContaining('Nenhum áudio encontrado com a palavra'),
      }),
      expect.anything(),
    );
  });

  it('should throw error on 2 or less keyword length', async () => {
    spyDigestMessage.mockRestore();
    await chatbot.sendMessage('!sons te');
    expect(spyClientEvaluateResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        responseType: InteractionResponseType.Reply,
        body: expect.stringContaining(
          'Insira pelo menos 3 caracteres para fazer uma pesquisa...',
        ),
      }),
      expect.anything(),
    );
  });

  it('should throw error if .wav audio file returned', async () => {
    spyDigestMessage.mockRestore();
    await chatbot.sendMessage('!sons vicvaporube');
    expect(spyClientEvaluateResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        responseType: InteractionResponseType.Reply,
        body: expect.stringContaining(
          'Por enquanto só é suportado áudio em mp3',
        ),
      }),
      expect.anything(),
    );
  });
});
