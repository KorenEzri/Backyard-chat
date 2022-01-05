export type Falsy<T> = T | false;
export type Maybe<T> = T | null;
export type Assignable<Obj, Item> = {
  [Key in keyof Obj]: Obj[Key] extends Item ? Key : never;
}[keyof Obj];
export type ValueOf<T> = T[keyof T];
