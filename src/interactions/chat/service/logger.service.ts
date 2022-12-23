import { Logger, transports } from 'winston';
import * as winston from 'winston';
import AbstractService from './abstract.service';

export default class LoggerService extends AbstractService {
  static instance: LoggerService;

  protected logger$: Logger;

  constructor() {
    super();

    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.Console(),
      ],
    });

    if (process.env.NODE_ENV === 'production') {
      logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }

    if (process.env.USE_DATADOG) {
      const httpTransportOptions = {
        host: 'http-intake.logs.datadoghq.com',
        path: `/api/v2/logs?dd-api-key=${process.env.DATADOG_API_KEY as string}&ddsource=nodejs&service=chatbot`,
        ssl: true,
      };

      logger.add(new transports.Http(httpTransportOptions));
    }

    this.logger$ = logger;

    LoggerService.instance = this;
  }

  static logger(): Logger {
    return LoggerService.getInstance<LoggerService>().logger$;
  }
}
