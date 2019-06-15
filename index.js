function tap(value) {
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