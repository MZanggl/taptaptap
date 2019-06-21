const { tap } = require('../index')

describe('proxy', () => {
    it('can chain methods of a non fluent api', () => {
        class User {
            setName() {return true}
            save() {return true}
        }
        
        const result = tap(new User).setName().save()

        expect(result).toBeInstanceOf(User)
    })

    it('can get back value after accessing tapOut', () => {
        class User {
            setName(name) {this.name = name}
            getName() {return this.name}
            save() {return true}
        }
        
        const result = tap(new User)
            .setName('tester name')
            .save()
            .tapOut
            .getName()

        expect(result).toBe('tester name')
    })

    it('works on arrays', () => {
        const numbers = tap([])
            .push(1)
            .push(2)

        expect(numbers).toEqual([1, 2])
    })
})

describe('callback', () => {
    it('passes value to callback', () => {
        tap('test', value => {
            expect(value).toBe('test')
        })
    })

    it('returns the passed value', () => {
        const result = tap('test', () => {})

        expect(result).toBe('test')
    })
})