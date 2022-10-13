import LoggerService from './interactions/chat/service/logger.service';
import ChatbotClient from './interface/chatbot-client.abstract';

const bootstrap = async (clients: ChatbotClient<any>[]) => {
  LoggerService.logger().warn('Initializing...');

  clients.forEach((client) => {
    client.initialize();
  });

  return LoggerService.logger().warn(`Loaded ${clients.length} providers`);
};

export default bootstrap;
