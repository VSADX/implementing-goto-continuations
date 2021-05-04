# Implementing goto continuations
Three kinds of `goto`
1. goto a line or label inside a function.
2. goto a **different function** (then execute it internally).
3. goto a **live function** (then execute against it internally).
  
## 2. different function `goto`
`6-goto-via-jit-pointers.js`
```js
function add() {
    // where are these variables declared?
    // are they global?
    //
    y = a + b
}
function divide() {
    x = a / b
}
```
```js
function calculatePoints() {
    goto = fn => eval(fn)
    
    const a = 2
    const b = 3
    let x = 4
    let y = 6

    // `a`, `b`, `x`, `y` only exist in this function. no globals are used! 
    // `add()` only is able to access them when we `goto (add)` inside this function
    // 
    if(x >= 200) goto (add)
    if(b >= 200) goto (divide)
    goto (add)

    return a + b + x + y
}
```
  
### What's going on here?
`goto (a_function)` will run that function directly wherever `goto` was last "set". That's why you see 
`goto = fn => eval(fn)`, this "sets" `goto`. When you `goto (add)` you are saying, run `add()` but give 
it access to all the variables that `function calculatePoints` can see.
  
### So what?
This allows you to extract functions but not have to switch to using parameters or globals. It let's you 
write code as easy as code using globals but not have any!
  
## 3. live function `goto` / `jump`  
`7-live-goto-via-stringify.js`  
```js
function Food() {
  let meal = "burger"
  [[Suspend]] // what on Earth is this?
  return meal
}
function Drink() {
  let beverage = "soda"
  [[Suspend]]
  return beverage 
}
```
```js
jump(Food, Drink)(() => {  
  
  // how is `meal` or `beverage` in scope??
  //
  let lunch = `You ordered a ${meal} / ${beverage} combo!`
  
  console.log(lunch)

})
```
  
### This makes zero to no sense.
If you try to run `Food()` or `Drink()` by itself, nothing special happens. When you put them in `jump()` you get a really magically function. 
`jump(Food, Drink)(() => { ... })` has access to **all the variables** of `Food()` + `Drink()`.
  
### 1. line number `goto` 
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
