export type BinaryNode<T> = Readonly<{
    parent?: BinaryNode<T>
    left?: BinaryNode<T>
    right?: BinaryNode<T>
    value: T
    repeat?: number
}>
