import { BinaryNode } from './binary-node'
import { defaultCompare } from './compare'

export const getNodeAdded = <T>(
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
    return { ...oldParent, left: getNodeAdded(value, oldParent.left, compare) }
  }
  return { ...oldParent, right: getNodeAdded(value, oldParent.right, compare) }
}
