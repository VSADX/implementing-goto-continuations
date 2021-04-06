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
setGoto(1)

s.next([true, false])
setGoto(1)

const result = s.next([true, true]).value

result.a // 4.5
```
