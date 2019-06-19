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
            if (prop === 'snapOut') {
                return target
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