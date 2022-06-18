





export class Debug {
    constructor(updates) {
        const div = document.createElement('div')
        div.style.position = 'fixed'
        document.body.appendChild(div)

        const DATA_COUNT = 100
        const dts = []
        const update = (dt) => {
            dts.unshift(dt)
            dts.length = DATA_COUNT

            div.innerHTML = `
            FPS: ${(DATA_COUNT / dts.reduce((a, b) => a + b)).toFixed(0)}
            `
        }
        updates.add(update)
    }
}





