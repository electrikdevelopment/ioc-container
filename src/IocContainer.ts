// TODO is there a built in type we can use here
// TODO Can we remove the any?
// from https://stackoverflow.com/questions/39392853/is-there-a-type-for-class-in-typescript-and-does-any-include-it
interface Type<T> extends Function {
  new (...args: any[]): T;
}

export class IocContainer {
  private readonly instances: { [className: string]: any };

  constructor() {
    this.instances = {};
  }

  create<T, A extends any[]>(clazz: Type<T>, ...args: A): T {
    const resolvedArgs = args.map((arg) => {
      const instance = this.instances[arg.name];
      if (!instance) {
        throw new Error(`Instance of ${arg.name} not found. Do you need to create it first?`);
      }
      return instance;
    });

    const instance = new clazz(...resolvedArgs);
    this.instances[clazz.name] = instance;
    return instance;
  }
}
