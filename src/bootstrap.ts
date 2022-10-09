import { ChatbotClient } from './typings';

export const bootstrap = async (clients: ChatbotClient<any>[]) => {
  console.log('Initializing...');

  for (const client of clients) {
    await client.initialize();
  }

  return console.log(`Loaded ${clients.length} providers`);
};
