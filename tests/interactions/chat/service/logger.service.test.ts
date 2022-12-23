import LoggerService from '@src/interactions/chat/service/logger.service';
import * as winston from 'winston';
import { Logger } from 'winston';

let spyWinston: jest.SpyInstance;
let spyWinstonTransports: jest.SpyInstance;
const spyWinstonAddMock = jest.fn();

describe('LoggerService', () => {
  beforeEach(() => {
    spyWinston = jest.spyOn(winston, 'createLogger');
    spyWinstonTransports = jest.spyOn(winston.transports, 'Console');

    spyWinston.mockReturnValue({
      add: spyWinstonAddMock,
      transports: [],
    });

    spyWinstonTransports.mockReturnValue(() => jest.fn());
  });

  it('should be a singleton', () => {
    const instance1 = LoggerService.getInstance();
    const instance2 = LoggerService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should start winston logger with production config', () => {
    process.env.NODE_ENV = 'production';

    const logger = new LoggerService(winston);

    expect(logger).toBeInstanceOf(LoggerService);
    expect(spyWinstonAddMock).toHaveBeenCalledWith(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  });

  it('should start winston logger with dev config', () => {
    process.env.NODE_ENV = 'dev';

    const logger = new LoggerService(winston);

    expect(logger).toBeInstanceOf(LoggerService);
    expect(spyWinstonAddMock).not.toHaveBeenCalledWith(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  });

  it('should start winston logger with datadog config', () => {
    process.env.USE_DATADOG = 'dev';

    const logger = new LoggerService(winston);

    expect(logger).toBeInstanceOf(LoggerService);
    expect(spyWinstonAddMock).not.toHaveBeenCalledWith(new winston.transports.Http(
      expect.objectContaining({
        host: 'http-intake.logs.datadoghq.com',
        path: expect.any(String),
        ssl: true,
      }),
    ));
  });

  it('should return the logger instance', () => {
    const logger = new LoggerService(winston);
    expect(logger.logger()).toBeDefined();
  });

  it('should create singleton with default winston', () => {
    const logger = new LoggerService();
    expect(logger).toBeDefined();
  });
});
