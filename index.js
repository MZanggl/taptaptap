function tap(value, callback) {
    if (callback) {
        callback(value)
        return value
    }

    return createProxy(value)
}

function createProxy(value) {
    const handler = {
        get(target, prop, receiver) {
            if (prop === 'tapOut') {
                return target
            }

            if (typeof target[prop] !== 'function') {
                return target[prop]
            }
  
            return (...args) => {
                target[prop](...args)
                return receiver
            }
        }
    }
  
    return new Proxy(value, handler)
}

module.exports = {
    tap,
}