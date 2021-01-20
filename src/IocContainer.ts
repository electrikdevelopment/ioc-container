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

  /**
   * Register a named constant for later injection into other objects. This constant can be of any type including an object.
   * @param name the name to register the constant under.
   * @param obj the constant to register
   * @return this for method chaining.
   */
  registerConst(name: string, obj: any): IocContainer {
    this.consts[name] = obj;
    return this;
  }

  /**
   * Create and register an instance of a class for later injection into other objects.
   * @param clazz the class to create.
   * @param argTypes the classes or names of registered constants for each constructor argument.
   * @return this for method chaining.
   */
  register<T, A extends any[]>(clazz: Type<T>, ...argTypes: A): IocContainer {
    this.create(clazz, ...argTypes);
    return this;
  }

  /**
   * Create, register and return an instance of a class,
   * @param clazz the class to create.
   * @param argTypes the classes or names of registered constants for each constructor argument.
   * @return this for method chaining.
   */
  create<T, A extends any[]>(clazz: Type<T>, ...argTypes: A): T {
    const resolvedArgs = argTypes.map((arg, i) => {
      let instance;
      if (typeof arg === 'string') {
        instance = this.consts[arg];
        if (!instance) {
          throw new Error(`Constant registered as ${arg} not found. Do you need to call register first?`);
        }
      } else if (typeof arg === 'function' && arg.name) {
        instance = this.instances[arg.name];
        if (!instance) {
          throw new Error(`Instance of ${arg.name} not found. Do you need to create or register it first?`);
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
