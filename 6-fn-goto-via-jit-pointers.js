Object.defineProperty(window, "goto", {
    get() {
        function internal_goto(pointer) {
            const caller = internal_goto.caller

            const context = caller[Symbol.for("goto")]
            context(`(${pointer})()`)
        }
        return internal_goto
    },
    set: function internal_set(value) {
            const caller = internal_set.caller

            caller[Symbol.for("goto")] = value
    }
})
