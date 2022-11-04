import SessionService from '@src/interactions/chat/service/session.service';

describe('SessionService', () => {
  it('should be a singleton', () => {
    const instance1 = SessionService.getInstance();
    const instance2 = SessionService.getInstance();
    expect(instance1).toBe(instance2);
  });
});
