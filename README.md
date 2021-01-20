# ioc-container

This library provides a very simple IoC container for use in javascript applications.
This currently only supports constructor injection into classes.

## Getting Started / Installation

Firstly install this package:

```
$ yarn add ioc-container
$ npm i ioc-container
```

Create a IocContainer and create your objects:
```javascript
const container = new IocContainer();
container.create(UserDao); // create an instance of UserDao that has no constructor arguments
const userhttpService = container.create(UserHttpService, UserDao); // create an instance of UserHttpService that uses the avaliable UserDao.

container.registerConst('accountDaoConfig', { url: 'some-url' }); // register a constant under the name 'accountDaoConfig'.
const accountDao = container.create(AccountDao, 'accountDaoConfig'); // create an instance of AccountDao that has one constant constructor argument
```

Example of simplifying object creation by using chaining:
```javascript
const container = new IocContainer();
const accountHttpService = container
        .register(UserDao)
        .registerConst('accountDaoConfig', { url: 'some-url' })
        .register(AccountDao, 'accountDaoConfig')
        .create(AccountHttpService, UserDao, AccountDao);
```

## Functionality Roadmap

* Support singleton vs prototype objects
* Auto create objects as needed. (and handle circular dependency check.)
* Support accessor injection
* Support function argument injection
* Support a mode where object construction is delayed so order does not matter.
* Add error codes to exceptions

## Known Issues
* The number of constructor args given is not checked against the constructor signature
* create will create a new instance of an object each time but the argument resolution will use the most recently created instance. 
  It should consistently reuse instances.

## Developer tooling Roadmap
* Add CI integration.
* Add better Readme documentation.
* Add a Contributing.md with branching strategy, release process and versioning strategy,
* Publish this to NPM.
* Add jsdocs for public functions
* Support windows development (non bash) environments.

