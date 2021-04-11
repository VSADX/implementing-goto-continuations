function useGoto(fn) {
    return (...args) => {
        fn[Symbol.for("goto")] = []
        try {
            fn(...args)
        } catch (error) {
            if(error instanceof Error) throw error

            const pointers = fn[Symbol.for("goto")]
            pointers.forEach(func => error(`(${func})()`))

            return error
        }
    }
}
window.goto = function internal_goto(pointer) {
    const caller = internal_goto.caller

    caller[Symbol.for("goto")] = caller[Symbol.for("goto")] || []
    caller[Symbol.for("goto")].push(pointer)
}
