export class UserDao {}

export class AccountDao {}

export class UserHttpService {
  dao: UserDao;

  constructor(dao: UserDao) {
    this.dao = dao;
  }
}

export class AccountHttpService {
  userDao: UserDao;
  accountDao: AccountDao;

  constructor(userDao: UserDao, accountDao: AccountDao) {
    this.userDao = userDao;
    this.accountDao = accountDao;
  }
}

export class Application {
  userHttpService: UserHttpService;
  accountHttpService: AccountHttpService;

  constructor(userHttpService: UserHttpService, accountHttpService: AccountHttpService) {
    this.userHttpService = userHttpService;
    this.accountHttpService = accountHttpService;
  }
}
