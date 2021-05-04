// of @/Simon_
function jump(...functions) {
  const keyword = '[[Suspend]]'
  functions = functions.reverse();
  return function (handler) {
    let source = functions.shift().toString().replace(keyword, `(${handler.toString()})()`);
    source = functions.reduce((src, fn) => fn.toString().replace(keyword, `(${src})()`), source);
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
