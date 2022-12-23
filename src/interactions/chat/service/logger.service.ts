import { Logger, transports } from 'winston';
import * as winston from 'winston';
import AbstractService from './abstract.service';

export default class LoggerService extends AbstractService {
  static instance: LoggerService;

  protected logger$: Logger;

  constructor(protected readonly _winston = winston) {
    super();

    const logger = _winston.createLogger({
      level: 'info',
      format: _winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new _winston.transports.Console(),
      ],
    });

    if (process.env.NODE_ENV === 'production') {
      logger.add(new _winston.transports.Console({
        format: _winston.format.simple(),
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

  public logger(): Logger {
    return this.logger$;
  }
}
