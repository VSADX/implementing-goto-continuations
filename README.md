# Implementing goto continuations

## Examples
### Loops using goto + stack
```js
const s = useContinuation()
var {setGoto, setStop, state, push} = s.next([false, false]).value

push("state.a = 3")

s.next([true, false])
push("state.a += .5")

s.next([true, false])
setGoto(2)

s.next([true, false])
setGoto(2)

const result = s.next([true, true]).value
```
