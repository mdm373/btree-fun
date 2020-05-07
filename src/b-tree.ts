import { defaultCompare } from './compare'

export type BinaryNode<T> = Readonly<{
    parent?: BinaryNode<T>
    left?: BinaryNode<T>
    right?: BinaryNode<T>
    value: T
    repeat?: number
}>

export const getParentNode = <T>(
  value: T,
  oldParent: BinaryNode<T>|undefined = undefined,
  compare = defaultCompare
): BinaryNode<T> => {
  if (!oldParent) {
    return { value }
  }
  const comp = compare(value, oldParent.value)
  if (comp === 0) {
    return { ...oldParent, repeat: (oldParent.repeat || 0) + 1 }
  }
  if (comp < 0) {
    return { ...oldParent, left: getParentNode(value, oldParent.left, compare) }
  }
  return { ...oldParent, right: getParentNode(value, oldParent.right, compare) }
}

export const getSortedValues = <T>(parent: BinaryNode<T>): readonly T[] => {
  const left = parent.left ? getSortedValues(parent.left) : []
  const values = Array((parent.repeat || 0) + 1).fill(parent.value)
  const right = parent.right ? getSortedValues(parent.right) : []
  return [...left, ...values, ...right]
}
