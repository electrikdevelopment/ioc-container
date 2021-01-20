import { IocContainer } from './IocContainer';
import { AccountDao, AccountHttpService, UserDao, UserHttpService } from './__test__/test-types';

describe('IocContainer', () => {
  let container: IocContainer;
  beforeEach(() => {
    container = new IocContainer();
  });

  describe('create', () => {
    it('creates an instance of a class with no constructor args', () => {
      const dao = container.create(UserDao);
      expect(dao).toBeInstanceOf(UserDao);
    });

    it('creates an instance of a class with class constructor args', () => {
      container.create(UserDao);
      const httpService = container.create(UserHttpService, UserDao);
      expect(httpService).toBeInstanceOf(UserHttpService);
      expect(httpService.dao).toBeInstanceOf(UserDao);
    });

    it('creates an instance of a class with const constructor args', () => {
      const dao = container.register('accountDaoConfig', { url: 'some-url' }).create(AccountDao, 'accountDaoConfig');
      expect(dao).toBeInstanceOf(AccountDao);
      expect(dao.config.url).toEqual('some-url');
    });

    it('creates an instance of a class with multiple class constructor args', () => {
      container.create(UserDao);
      container.register('accountDaoConfig', { url: 'some-url' });
      container.create(AccountDao, 'accountDaoConfig');
      const httpService = container.create(AccountHttpService, UserDao, AccountDao);
      expect(httpService).toBeInstanceOf(AccountHttpService);
      expect(httpService.userDao).toBeInstanceOf(UserDao);
      expect(httpService.accountDao).toBeInstanceOf(AccountDao);
    });

    it('throws an error if a class cant be found', () => {
      expect(() => container.create(UserHttpService, UserDao)).toThrow(
        'Instance of UserDao not found. Do you need to create it first?',
      );
    });

    it('throws an error if a const cant be found', () => {
      expect(() => container.create(AccountDao, 'accountDaoConfig')).toThrow(
        'Constant registered as accountDaoConfig not found. Do you need to call register first?',
      );
    });

    it('throws an error if an arg type is not recognised', () => {
      expect(() => container.create(AccountDao, 42)).toThrow('Unknown argument type at index 0');
    });
  });
});
