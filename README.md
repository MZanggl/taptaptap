## Turns non fluent APIs into fluent APIs

> `npm install taptaptap`

## Examples 
Take `Array.prototype.push` for example. It returns the new length of the array, making chaining impossible.

```javascript
const numbers = []
numbers.push(1)
numbers.push(2)
```

Wrapping the array inside "tap" allows us to chain everything together nicely.

```javascript
const { tap } = require('taptaptap')

const numbers = tap([])
    .push(1)
    .push(2)
```
`tap` uses ES6 proxies to make sure each function gets executed, but returns the initially passed value (in this case, the numbers array).

---

One more example using classes

```javascript
class User {
    name = null
    setName(name) {
        this.name = name
    }
    
    getId() {
        return this.id
    }

    save() {
        // persist data

        this.id = this.createUUID() // fill it with new id
        this.createdAt = new Date()

        return true // if everything went well
    }
}
```

The way the API was built forces us to access it like this.

```javascript
function createUser(name) {
    const user = new User
    
    user.setName(name)
    user.save()

    return user
}
```

Using tap we can do 

```javascript
const { tap } = require('taptaptap')

function createUser(name) {
    return tap(new User)
        .setName(name)
        .save()
}
```

or using an arrow function

```javascript
const { tap } = require('taptaptap')

const createUser = name => tap(new User).setName(name).save()
```

## Getting values

Since every function just executes the initial value again, you either have to break out of the chain, or literally snap out of it.

```javascript
const { tap } = require('taptaptap')

function createUserAndGetId(name) {
    return tap(new User)
        .setName(name)
        .save()
        .snapOut
        .getId()
}
```

---

Alternatively, you can also pass a function in the second argument to group common logic.

Turning

```javascript
const user = User.query().latest().first()

expect(user.name).toBe('test name')
expect(user.bio).toBe('test bio')
```

to

```javascript
tap(User.query().latest().first(), user => {
    expect(user.name).toBe('test name')
    expect(user.bio).toBe('test bio')
})
```