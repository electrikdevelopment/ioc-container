import { IocContainer } from './IocContainer';

describe('IocContainer', () => {
  describe('create', () => {
    it('throws', () => {
      const container = new IocContainer();
      expect(() => container.createObject()).toThrow('Not Implemented');
    });
  });
});
