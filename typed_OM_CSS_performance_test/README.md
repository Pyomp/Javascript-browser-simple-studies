
# Result

- element.style.transform is much easier to use.

- The gain may be negligible in front of matrix operations, but the test only matter in this context to me.

- I got the same fps downgrade at 150 div draw between

```js
el.style.transform = `translate(${p_x.value}px,${p_y.value}px)
            matrix3d(
                ${m.m11},${m.m12},${m.m13},${m.m14},
                ${m.m21},${m.m22},${m.m23},${m.m24},
                ${m.m31},${m.m32},${m.m33},${m.m34},
                ${m.m41},${m.m42},${m.m43},${m.m44})`
```

and 

```js
style_map.set('transform', t)
```
where t is a CSSTransformValue (see the setup in `Plane.js`)

So, String style win in my opinion.
