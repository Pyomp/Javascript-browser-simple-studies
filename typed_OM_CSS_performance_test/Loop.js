






export class Loop {

    updates = new Set()

    constructor() {
        let last = 0
        const math_min = Math.min
        const update = (now) => {

            const dt = math_min(0.1, (now - last) / 1000)
            last = now

            for (const f of this.updates) {
                if (f(dt) === true) {
                    this.updates.delete(f)
                }
            }
            requestAnimationFrame(update)
        }
        requestAnimationFrame(update)
    }
}





