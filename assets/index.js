
const newEle = (type, props = {}, text = undefined) => {
  const ele = document.createElement(type)
  if (text) {
    const textNode = document.createTextNode(text)
    ele.appendChild(textNode)
  }
  Object.keys(props).forEach(key => {
    ele.setAttribute(key, props[key])
  })
  return ele
}

const append = (node, ...elements) => {
  elements.forEach(element => node.appendChild(element))
  return node
}

const clear = (node) => {
  while (node.childNodes.length > 0) {
    node.removeChild(node.childNodes[0])
  }
}

const treeRoot = newEle('ul', { class: 'tree' })

const appendButton = newEle('button', { class: 'button' }, 'Append Value')
const appendValue = newEle('input', { type: 'text', name: 'append-value' })

const controls = append(
  newEle('form'),
  newEle('label', { for: 'append-value', class: 'label' }, 'Value'),
  appendValue,
  newEle('br'),
  appendButton
)
const getNodeEle = (node) => {
  const suffix = node.repeat ? ` (${node.repeat})` : ''
  const ele = append(
    newEle('li'),
    newEle('code', {}, `${node.value} ${suffix}`)
  )
  if (node.left || node.right) {
    const wrapper = newEle('ul')
    append(ele, wrapper)
    node.left && append(wrapper, getNodeEle(node.left))
    node.right && append(wrapper, getNodeEle(node.right))
  }
  return ele
}

appendButton.addEventListener('click', async (event) => {
  event.preventDefault()
  const value = Number.parseInt(appendValue.value)
  console.log(value)
  const response = await fetch('api/tree/append', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ value })
  })
  const root = await response.json()
  clear(treeRoot)
  append(
    treeRoot,
    getNodeEle(root)
  )
})

append(
  document.getElementsByClassName('app')[0],
  newEle('h1', {}, 'Binary Tree Fun'),
  newEle('br'),
  controls,
  newEle('br'),
  treeRoot
)

const init = async () => {
  const result = await fetch('api/tree/describe')
  const root = await result.json()
  clear(treeRoot)
  append(
    treeRoot,
    getNodeEle(root)
  )
}
init()
