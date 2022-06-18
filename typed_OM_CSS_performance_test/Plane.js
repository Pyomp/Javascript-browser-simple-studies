




export class Plane {

    constructor(parent, updates, width, height) {
        const el = document.createElement('div')
        parent.appendChild(el)

        el.innerHTML = 'coucou'

        const middle_x = parent.offsetWidth / 2
        const middle_y = parent.offsetHeight / 2

        const style_map = el.attributeStyleMap
        style_map.set('position', 'fixed')
        style_map.set('left', CSS.px(middle_x - el.offsetWidth / 2))
        style_map.set('top', CSS.px(middle_y - el.offsetHeight / 2))

        const w = width ?? middle_x / 10.
        const h = height ?? middle_y / 10
        style_map.set('width', CSS.px(w))
        style_map.set('height', CSS.px(h))
        style_map.set('background', '#4444ff')

        style_map.set('perspective', CSS.px(50))

        const t = new CSSTransformValue([
            new CSSTranslate(CSS.px(0), CSS.px(0)),
            new CSSMatrixComponent(
                new DOMMatrix([
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, -1 / w / 3,
                    0, 0, 0, 1,
                ])
            )
        ])


        /** @type {DOMMatrix} */
        const p = t[0]
        const m = t[1].matrix

        const p_x = p.x
        const p_y = p.y
        const p_z = p.z
        this.position = {
            get x() { return p_x.value }, set x(a) { p_x.value = a },
            get y() { return p_y.value }, set y(a) { p_y.value = a },
            get z() { return p_z.value }, set z(a) { p_z.value = a },
        }

        const v_x = middle_x / 2
        const v_y = middle_y / 2
        const rand_x = (Math.random() - .5) * middle_x / 2
        const rand_y = (Math.random() - .5) * middle_y / 2

        let age = Math.random() * 6.3
        const update = (dt) => {
            age += dt

            m.rotateAxisAngleSelf(0, 1, 0, 180 * dt)

            const c = Math.cos(age)
            p_x.value = c * v_x + rand_x
            p_y.value = c * Math.sin(age) * v_y + rand_y

            // style_map.set('transform', t)
            el.style.transform = `translate(${p_x.value}px,${p_y.value}px)
            matrix3d(
                ${m.m11},${m.m12},${m.m13},${m.m14},
                ${m.m21},${m.m22},${m.m23},${m.m24},
                ${m.m31},${m.m32},${m.m33},${m.m34},
                ${m.m41},${m.m42},${m.m43},${m.m44})`
        }

        updates.add(update)

        this.dispose = () => {
            updates.delete(update)
            el.remove()
        }
    }
}














