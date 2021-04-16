# Implementing goto continuations
Three kinds of `goto`
1. goto a line or label inside a function.
2. goto a different function (then execute it internally).
3. goto a live function (then execute against it internally).
  
## Examples
  
### 2. Different function `goto`
`6-goto-via-jit-pointers.js`
```js
function divide() {
    c += 10
    d = (d * .25) + c
    x /= c + d 
}

function add() {
    x += y + a + b
}
```
```js
function calculatePoints(...points) {
    goto = fn => eval(fn)

    let [x, y] = points
    let { a, b } = {a: 12, b: 13}

    if(x >= 200) goto (add)
    if(b >= 200) goto (divide)
    goto (add)

    return a + b + x + y
}
```
  
### 3. Live function `goto` / `jump`
```js
function Food() {
  let meal = "burger"
  [[goto]]
  return meal
}
function Drink() {
  let beverage = "soda"
  [[goto]]
  return beverage 
}
```
```js
jump(Food, Drink)(() => {  
  let lunch = `You ordered a ${meal} / ${beverage} combo!`
  console.log(lunch)
})
```
  
### 1. Using line number `goto` 
`./2-goto-via-command-stack.js`
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
