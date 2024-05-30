type ParametersExceptFirst<F> = F extends (arg0: any, ...rest: infer P) => any ? P : never;

type MethodsOf<T> = {
  [K in keyof T]: T[K] extends ((...arg: any[]) => any) ? T[K] : never
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

  fn<Name extends keyof MethodsOf<V>>(
    func: Name,
    ...args: V[Name] extends ((...args: infer P) => any) ? P : never
  ): ReturnType<typeof chain<ReturnType<MethodsOf<V>[Name]>>>,

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