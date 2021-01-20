// TODO is there a built in type we can use here
// TODO Can we remove the any?
// from https://stackoverflow.com/questions/39392853/is-there-a-type-for-class-in-typescript-and-does-any-include-it
interface Type<T> extends Function {
  new (...args: any[]): T;
}

export class IocContainer {
  private readonly instances: { [className: string]: any };
  private readonly consts: { [name: string]: any };

  constructor() {
    this.instances = {};
    this.consts = {};
  }

  registerConst(name: string, obj: any): IocContainer {
    this.consts[name] = obj;
    return this;
  }

  register<T, A extends any[]>(clazz: Type<T>, ...args: A): IocContainer {
    this.create(clazz, ...args);
    return this;
  }

  create<T, A extends any[]>(clazz: Type<T>, ...args: A): T {
    const resolvedArgs = args.map((arg, i) => {
      let instance;
      if (typeof arg === 'string') {
        instance = this.consts[arg];
        if (!instance) {
          throw new Error(`Constant registered as ${arg} not found. Do you need to call register first?`);
        }
      } else if (typeof arg === 'function' && arg.name) {
        instance = this.instances[arg.name];
        if (!instance) {
          throw new Error(`Instance of ${arg.name} not found. Do you need to create it first?`);
        }
      } else {
        throw new Error(`Unknown argument type at index ${i}`);
      }
      return instance;
    });

    const instance = new clazz(...resolvedArgs);
    this.instances[clazz.name] = instance;
    return instance;
  }
}
