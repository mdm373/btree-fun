import { BinaryNode } from './binary-node'

export const getSortedValues = <T>(parent: BinaryNode<T>): readonly T[] => {
  const left = parent.left ? getSortedValues(parent.left) : []
  const values = Array((parent.repeat || 0) + 1).fill(parent.value)
  const right = parent.right ? getSortedValues(parent.right) : []
  return [...left, ...values, ...right]
}
