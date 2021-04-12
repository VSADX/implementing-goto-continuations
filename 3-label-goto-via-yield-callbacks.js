// of @/Simon_
function useGoto(fn) {
    if(!new.target) return new useGoto(fn)
    this.stack = []
    this.label = {}

    this.goto = (function(name = [""]) {
        let i = this.label[name[0]].position
        while(i < this.stack.length) this.stack[i++]()
    }).bind(this)
    
    for(const part of fn.call(this, this.goto)) {
        if(typeof part === "function") {
            const result = part.toString().match(/^\(?(\w+)\)? => /)
            if(result) {
                this.label[result[1]] = { value: part, position: this.stack.length }
                this.stack.push(part)
            }
        }
        part()
    }
}

/*

function* calc(goto) {
  this.value = 0

  yield add => this.value += 10 // this line runs 1 time
  yield sub => this.value -= .5 // this line runs 3 times
  
  goto`sub`
  goto`sub`

  console.log("final value", this.value) // 8.5
  return this.value
}

*/
