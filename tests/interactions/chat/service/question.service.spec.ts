import QuestionService from '@src/interactions/chat/service/question.service';

describe('QuestionService', () => {
  it('should be a singleton', () => {
    const instance1 = QuestionService.getInstance();
    const instance2 = QuestionService.getInstance();
    expect(instance1).toBe(instance2);
  });
});
