// of @/Simon_
function jump(...functions) {
  const keyword = '[[goto]]'
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
  [[goto]];
  return a;
}
function B() {
  let b = 3;
  [[goto]];
  return b;
}
*/
