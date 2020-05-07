import { getParentNode, BinaryNode, getSortedValues } from './b-tree'

const values = [10, 10, 7, 13, 6, 9, -41]
const root: BinaryNode<number>|undefined = values.reduce(
  (agg: BinaryNode<number>|undefined, current: number) => getParentNode(current, agg),
  undefined
)
if (!root) {
  throw new Error('somehow we failed to create root')
}

console.log(getSortedValues(root))
