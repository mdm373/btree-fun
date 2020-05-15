export type BinaryNode<T> = Readonly<{
    left?: BinaryNode<T>
    right?: BinaryNode<T>
    value: T
    repeat?: number
}>
