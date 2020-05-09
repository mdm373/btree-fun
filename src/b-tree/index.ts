import { getNodeAdded } from './node-added'
import { getNodeRemoved } from './node-removed'
import { BinaryNode as BinaryNodeType } from './binary-node'
import { getSortedValues } from './sorted-values'
import { getFirstValues } from './first-values'
import { CompareValue as CompareValueType, defaultCompare } from './compare'

export type BinaryNode<T> = BinaryNodeType<T>
export type CompareValue<T> = CompareValueType<T>

export const bTree = { getNodeAdded, getNodeRemoved, getSortedValues, getFirstValues, defaultCompare }
