import express from 'express'
import { bTree } from '../b-tree'
const app = express()
const port = process.env.port || 3000

let tree = bTree.getNodeAdded(100)

app.use(express.json())

app.use('/api/tree/describe', (_, res) => {
  res.send(JSON.stringify(tree))
})
app.use('/api/tree/append', (req, res) => {
  const { value } = req.body
  if (value === null || value === undefined) {
    res.sendStatus(400)
    return
  }
  tree = bTree.getNodeAdded(value, tree)
  console.log(tree)
  res.send(JSON.stringify(tree))
})
app.use(express.static('assets'))

app.listen(process.env.port || 3000, () => console.log(`serving binary tree fun on port ${port} (index.html)`))
