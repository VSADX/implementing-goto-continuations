// of @/Simon_
function jump(...functions) {
  functions = functions.reverse();
  return function (handler) {
    let source = functions.shift().toString().replace('[[Suspend]]', `(${handler.toString()})()`);
    source = functions.reduce((src, fn) => fn.toString().replace('[[Suspend]]', `(${src})()`), source);
    return eval(`(${source})()`);
  };
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
