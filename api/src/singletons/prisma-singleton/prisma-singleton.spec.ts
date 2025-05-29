import PrismaSingleton from './prisma-singleton';

describe('PrismaSingleton', () => {
  it('should be defined', () => {
    expect(PrismaSingleton.instance.client).toBeDefined();
  });
});
