import PrismaService from '@src/interactions/chat/service/prisma.service';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn(),
  })),
}));

describe('PrismaService', () => {
  it('should be a singleton', () => {
    const instance1 = PrismaService.getInstance();
    const instance2 = PrismaService.getInstance();
    expect(instance1).toBe(instance2);
  });
});
