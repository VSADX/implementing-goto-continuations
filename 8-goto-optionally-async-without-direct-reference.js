function* generator (body) {
  const labels = Object.keys(body)
  let label

  while (true) {
    label = yield body[label]?.call()
    
    if (!labels.includes(`${label}`)) {
      throw new ReferenceError(`Unknown label: ${label}`)
    }
  }
}

const declare = body => {
  const gen = generator(body)

  gen.next()

  return label => gen.next(label).value
}

const goto = declare({
  a: () => console.log('a'),
  b: () => new Promise(resolve => setTimeout(resolve, 2000))
    .then(() => console.log('b')),
  c: () => console.log('c')
})

goto `a` // 'a'
await goto `b` // b (after 2 seconds)
goto `c` // 'c'
