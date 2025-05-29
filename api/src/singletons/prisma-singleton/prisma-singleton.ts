import { PrismaClient } from 'generated/prisma';

export default class PrismaSingleton {
  static #instance: PrismaSingleton;
  #prisma: PrismaClient;

  private constructor() {
    this.#prisma = new PrismaClient({
      log: ['error', 'info', 'query', 'warn'],
    });
  }

  public static get instance(): PrismaSingleton {
    if (!PrismaSingleton.#instance) {
      PrismaSingleton.#instance = new PrismaSingleton();
    }
    return PrismaSingleton.#instance;
  }

  public get client(): PrismaClient {
    return this.#prisma;
  }

  async disconnect(): Promise<void> {
    await this.#prisma.$disconnect();
  }
}
