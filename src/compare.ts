export type CompareValue<T> = (one: T, two: T) => number

export const defaultCompare: CompareValue<any> = (one, two) => {
  if (one === two) {
    return 0
  }
  if (one > two) {
    return 1
  }
  return -1
}
