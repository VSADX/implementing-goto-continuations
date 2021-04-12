function toContext(gen_fn = () => {}, previous = [0,0]) {
    window.exit = false
    const yield_points = previous[0] || 
        (gen_fn.toString()
            .split(" = yield ")
            .map(str => str.substr(str.lastIndexOf("let ") + 4))
            .slice(0, -1))

    let temp_vals = previous[1] || yield_points.map(name => undefined)

    const box = gen_fn()
    try {

        if (previous[0]) 
        do {
            var i = ++i || 0
            var { value, done } = box.next(temp_vals[i - 1])
        }
        while(!done)

        else    
        do var { value, done } = box.next(value)
        while(!done)
    }
    catch(error) {
        if(error instanceof Error) throw error

        const base = {
            inner: {
                previous: [yield_points, temp_vals], 
                context: error
            },
            context(command) {
                return this.inner.context(`(${command})`)
            },
            next() {
                this.inner.previous[0].map((name, i) => 
                    this.inner.previous[1][i] = this.context(`(${name})`))
                
                this.inner = toContext(error("arguments.callee"), this.inner.previous).inner
            }
        }

        return {
            inner: base.inner,
            context: base.context.bind(base),
            next: base.next.bind(base),
        }
    }
    return value
}
