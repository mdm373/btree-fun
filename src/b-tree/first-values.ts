import { BinaryNode } from './binary-node'
import { CompareValue, defaultCompare } from './compare'

export const getFirstValues = <T>(
  count: number,
  node?: BinaryNode<T>,
  compare: CompareValue<T> = defaultCompare
): readonly T[] => {
  if (count <= 0) {
    return []
  }
  if (!node) {
    return []
  }
  const left = getFirstValues(count, node.left, compare)
  const center = left.length < count ? [node.value] : []
  const right = getFirstValues(count - left.length - 1, node.right, compare)
  return [...left, ...center, ...right]
}
