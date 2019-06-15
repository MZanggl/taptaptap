## Turns non fluent APIs into fluent APIs

> `npm install taptaptap`

Imagine a class like this

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

or with arrow functions

```javascript
const { tap } = require('taptaptap')

const createUser = name => tap(new User).setName(name).save()
```

`tap` uses ES6 proxies to make sure each function returns the original value (in our case, the user).

## Getting values

To get values while still keeping the chain going, literally snap out of it.

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