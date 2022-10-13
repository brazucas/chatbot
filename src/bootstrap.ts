import ChatbotClient from './interface/chatbot-client.abstract';

const bootstrap = async (clients: ChatbotClient<any>[]) => {
  console.log('Initializing...');

  clients.forEach((client) => {
    client.initialize();
  });

  return console.log(`Loaded ${clients.length} providers`);
};

export default bootstrap;
