




const pIndexedDB = (name, keyPath, indexes = []) => {
    return new Promise((resolve) => {

        const DBOpenRequest = window.indexedDB.open(name)

        DBOpenRequest.onerror = (e) => { resolve() }

        DBOpenRequest.onsuccess = (e) => {
            const db = DBOpenRequest.result
            resolve(initGetAddRemove(db))
        }

        // if the db is not init (or version upgrade)
        DBOpenRequest.onupgradeneeded = (e) => {
            const target = e.target
            const db = target.result

            db.onerror = () => { resolve() }// Error loading database           

            // create "table", keyPath = primary key
            const objectStore = db.createObjectStore(name, { keyPath: keyPath })
            for (const index of indexes) {
                objectStore.createIndex(index, index, { unique: false })
            }
            target.transaction.oncomplete = () => { resolve(initGetAddRemove(db)) }
            target.transaction.onerror = () => { resolve() }
            target.transaction.onabort = () => { resolve() }
        }

        // what we resolve when indexedDB is ready
        const initGetAddRemove = (db) => {

            // for all functions, resolve undefined if nothing or fail

            return {
                add: (newItem) => {
                    return new Promise((resolve) => {
                        const transaction = db.transaction([name], "readwrite")
                        transaction.oncomplete = () => { resolve(result) }
                        transaction.onerror = () => { resolve() }
                        transaction.onabort = () => { resolve() }
                        const objectStore = transaction.objectStore(name)
                        const req = objectStore.add(newItem)
                        let result
                        req.onsuccess = () => { result = true }
                    })
                },
                get: (key) => {
                    return new Promise((resolve) => {
                        const transaction = db.transaction([name], "readwrite")
                        transaction.oncomplete = () => { resolve(req.result) }
                        transaction.onerror = () => { resolve() }
                        transaction.onabort = () => { resolve() }
                        const objectStore = transaction.objectStore(name)
                        const req = objectStore.get(key)
                    })
                },
                delete: (key) => {
                    return new Promise((resolve) => {
                        const transaction = db.transaction([name], "readwrite")
                        transaction.oncomplete = () => { resolve(result) }
                        transaction.onerror = () => { resolve() }
                        transaction.onabort = () => { resolve() }
                        const objectStore = transaction.objectStore(name)
                        const req = objectStore.delete(key)
                        let result
                        req.onsuccess = () => { result = true }
                    })
                }
            }
        }
    })
}

(async () => {
    // init db
    const db = await pIndexedDB('storage', 'key', ['blob'])
    if (!db) return

    // example of adding data
    await db.add({ name: 'yepKey', blob: new Blob(['y', 'e', 'p']) })

    // example of getting data
    let data = await db.get('yepKey')
    console.log(data)

    // handle if no data
    if (data) {
        console.log('blob text is: ' + await data.blob.text())
    } else {
        // data = await fetch('./binary51') or default data or what you want
    }

    await db.delete('yepKey')
    console.log(await db.get('yepKey'))
})()
