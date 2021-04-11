function* useContinuation() {
    const stack = []
    let goto = 0
    let stop = stack.length
    const push = str => stack.push(str) && ++stop
    const setGoto = num => goto = num
    const setStop = num => exit = num
    const state = {}
    
    while(!quit) {
        let bag = {setGoto, setStop, state, push}
        
        console.log(bag)
        
        do var [exit, quit] = yield bag
        while (!exit) exit = false
    
        console.log({goto, stop})

        const cmds = stack.slice(goto, stop)
        for(let cmd of cmds)
            eval(cmd)
        goto = stop
    }
    return state
}

/*

const s = useContinuation()
var {setGoto, setStop, state, push} = s.next([false, false]).value

push("state.a = 3")
push("state.b = 3")

s.next([true, false])

push("state.a += .5")

s.next([true, false])
setGoto(2)

s.next([true, false])
setGoto(2)

const result = s.next([true, true]).value
*/
