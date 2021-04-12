function jump(fn, fnf) {
  return function(handler) {
    const source = handler.toString();
    let secondSource = fnf.toString().replace('[[Suspend]]', `(${handler.toString()})()`);
    let firstSource = fn.toString().replace('[[Suspend]]', `(${secondSource})()`);
    firstSource = `(${firstSource})()`
    console.log(firstSource)
    return eval(firstSource);
  }
}
/*
jump(A, B)(() => {  
  a *= 32;
  b /= 12;
  console.log(a, b)
});
*/
/*
function A() {
  let a = 4;
  [[Suspend]];
  return a;
}
function B() {
  let b = 3;
  [[Suspend]];
  return b;
}
*/
