# Implementing goto continuations

## Examples
### Loops using goto + stack + `function*`
```js
const s = useContinuation()
const {setGoto, setStop, state, push} = s.next([false, false]).value

push("state.a = 3")

s.next([true, false]) // a = 3
push("state.a += .5")

s.next([true, false]) // a = 3.5
setGoto(1)

s.next([true, false]) // a = 4
setGoto(1)

s.next([true, true]) // a = 4.5

console.log(state.a) // 4.5
```
