export type CompareValue<T> = (one: T, two: T) => number

export const defaultCompare: CompareValue<any> = (one, two) => one - two

