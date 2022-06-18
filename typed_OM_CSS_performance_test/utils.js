export const copyDOMMatrix = (m1, m2) => {
    m1.m11 = m2.m11
    m1.m12 = m2.m12
    m1.m13 = m2.m13
    m1.m14 = m2.m14

    m1.m21 = m2.m21
    m1.m22 = m2.m22
    m1.m23 = m2.m23
    m1.m24 = m2.m24

    m1.m31 = m2.m31
    m1.m32 = m2.m32
    m1.m33 = m2.m33
    m1.m34 = m2.m34

    m1.m41 = m2.m41
    m1.m42 = m2.m42
    m1.m43 = m2.m43
    m1.m44 = m2.m44
}



export const projectionMatrix = (near, far, fov, zoom, aspect) => {
    let top = near * Math.tan((Math.PI / 180) * 0.5 * fov) / zoom
    let height = 2 * top
    let width = aspect * height
    let left = - 0.5 * width

    return makePerspective(left, left + width, top, top - height, near, far)
}

export const makePerspective = (left, right, top, bottom, near, far) => {

    const te = new Array(16)
    const x = 2 * near / (right - left)
    const y = 2 * near / (top - bottom)

    const a = (right + left) / (right - left)
    const b = (top + bottom) / (top - bottom)
    const c = - (far + near) / (far - near)
    const d = - 2 * far * near / (far - near)

    te[0] = x; te[4] = 0; te[8] = a; te[12] = 0
    te[1] = 0; te[5] = y; te[9] = b; te[13] = 0
    te[2] = 0; te[6] = 0; te[10] = c; te[14] = d
    te[3] = 0; te[7] = 0; te[11] = - 1; te[15] = 0

    return te

}




