import bootstrap from '@src/bootstrap';
import MockClient from './mock.client';

describe('main', () => {
  const clients = [new MockClient([])];
  let spyClientInitialize: jest.SpyInstance;

  beforeAll(async () => {
    spyClientInitialize = jest.spyOn(clients[0], 'initialize');
  });

  afterAll(() => {
    spyClientInitialize.mockReset();
  });

  it('should initialize clients', async () => {
    await bootstrap(clients);
    expect(spyClientInitialize).toBeCalled();
  });
});
