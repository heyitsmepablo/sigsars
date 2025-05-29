/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaClient } from 'generated/prisma';
import PrismaSingleton from '../singletons/prisma-singleton/prisma-singleton';

jest.mock('../singletons/prisma-singleton/prisma-singleton', () => {
  return {
    __esModule: true,
    default: {
      instance: { client: mockDeep<PrismaClient>() },
    },
  };
});

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = PrismaSingleton.instance
  .client as unknown as DeepMockProxy<PrismaClient>;
