import LoggerService from '@src/interactions/chat/service/logger.service';

describe('LoggerService', () => {
  it('should be a singleton', () => {
    const instance1 = LoggerService.getInstance();
    const instance2 = LoggerService.getInstance();
    expect(instance1).toBe(instance2);
  });
});
