type ParametersExceptFirst<F> = F extends (arg0: any, ...rest: infer P) => any ? P : never;

type MethodNames<T> = keyof {
  [K in keyof T]: T[K] extends ((...arg: any[]) => any) ? K : never
};

/**
 * An alternative to lodash chain function that is tailored to have zero dependency.
 * https://dev.to/munawwar/lodash-chaining-revisited-1c5d
*/
export function chain<V>(value: V): {
  fn<Func extends (v: V, ...args: any[]) => any>(
    func: Func,
    ...args: ParametersExceptFirst<Func>
  ): ReturnType<typeof chain<ReturnType<Func>>>,

  fn<Name extends MethodNames<V>>(
    func: Name,
    ...args: V extends { [k:string|number|symbol]: any} ? Parameters<V[Name]> : never
  ): ReturnType<typeof chain<ReturnType<V[Name]>>>,

  value: V
} {
  function fn<Func extends (...args: any[]) => any>(func: any, ...args: any[]) {
    if (typeof func === 'function') {
      return chain((func as Func)(value, ...args));
    }
    return chain(((value as any as { [k: string]: Func })[func as string] as Func)(...args));
  }
  return { fn, value };
}