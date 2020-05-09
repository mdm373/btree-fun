import { BinaryNode } from './binary-node'
import { defaultCompare } from './compare'
import { getSortedValues } from './sorted-values'
import { getNodeAdded } from './node-added'

export const getNodeRemoved = <T>(
  value: T,
  oldParent: BinaryNode<T>|undefined,
  compare = defaultCompare
): BinaryNode<T>|undefined => {
  if (!oldParent) {
    return undefined
  }
  const comp = compare(value, oldParent.value)
  if (comp === 0) {
    const decrementedRepeat = (oldParent.repeat || 0) - 1
    if (decrementedRepeat < 0) {
      if (!oldParent.left && !oldParent.right) {
        return undefined
      }
      if (oldParent.left && oldParent.right) {
        return getSortedValues(oldParent.left)
          .reduce(
            (agg, current) => getNodeAdded(current, agg, compare),
            oldParent.right
          )
      }
      return oldParent.left || oldParent.right
    }
    if (decrementedRepeat === 0) {
      const noRepeat = { ...oldParent }
      delete noRepeat.repeat
      return noRepeat
    }
    return { ...oldParent, repeat: decrementedRepeat }
  }

  if (comp < 0 && oldParent.left) {
    const removedLeft = getNodeRemoved(value, oldParent.left, compare)
    if (removedLeft === oldParent.left) {
      return oldParent
    }
    return { ...oldParent, left: removedLeft }
  }

  if (comp > 0 && oldParent.right) {
    const removedLeft = getNodeRemoved(value, oldParent.right, compare)
    if (removedLeft === oldParent.right) {
      return oldParent
    }
    return { ...oldParent, right: removedLeft }
  }
  return oldParent
}
