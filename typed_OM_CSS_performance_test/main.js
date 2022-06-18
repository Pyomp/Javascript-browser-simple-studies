import { Debug } from './Debug.js'
import { Loop } from './Loop.js'
import { Plane } from './Plane.js'





const loop = new Loop()
new Debug(loop.updates)
for (let i = 0; i < 150; i++) {
    const plane = new Plane(
        document.body,
        loop.updates
    )
}













