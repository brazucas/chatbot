import { PrismaClient } from '@prisma/client';
import AbstractService from './abstract.service';

export default class PrismaService extends PrismaClient implements AbstractService {
  private static instance: PrismaService;

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }

    return PrismaService.instance;
  }

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });

    this.$connect();
  }
}
