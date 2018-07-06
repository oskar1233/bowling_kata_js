const Game = require('./app.js')

/**
 * Helper function; rolls X times with value of 1.
 *
 * @param {count}   integer How many times should we roll
 * @param {game}    Game    Game to roll in
 */
function rollTimes(count, game) {
    for(let i = 0; i < count; ++i) {
        game.roll(1)
    }
}

describe('Test Bowling Game', () => {

    let game

    beforeEach(() => {
        game = new Game()
    })

    test('throws exception if too many points in roll', () => {
        expect(() => {
            game.roll(11)
        }).toThrow()
    })

    test('throws exception if too many rolls', () => {
        rollTimes(20, game)

        expect(() => {
            game.roll(1)
        }).toThrow()
    })

    test('throws exception if too many rolls [strike at the end]', () => {
        rollTimes(18, game)

        game.roll(10)

        game.roll(1)
        game.roll(1)

        expect(() => {
            game.roll(1)
        }).toThrow()
    })

    test('throws exception if too many rolls [spare at the end]', () => {
        rollTimes(18, game)

        game.roll(5)
        game.roll(5)

        game.roll(1)

        expect(() => {
            game.roll(1)
        }).toThrow()
    })

    test('throws exception if too many rolls [spare + strike at the end]', () => {
        rollTimes(18, game)

        game.roll(5)
        game.roll(5)

        game.roll(10)

        expect(() => {
            game.roll(1)
        }).toThrow()
    })

    test('throws exception if too many rolls [strike + spare at the end]', () => {
        rollTimes(18, game)

        game.roll(10)

        game.roll(5)
        game.roll(5)

        expect(() => {
            game.roll(1)
        }).toThrow()
    })
    test('throws exception if too many rolls [double strike at the end]', () => {
        rollTimes(18, game)

        game.roll(10)
        game.roll(10)

        expect(() => {
            game.roll(1)
        }).toThrow()
    })

    test('score returns sum of rolls', () => {
        game.roll(5)
        game.roll(5)
        expect(game.score()).toEqual(10)
    })

    test('counts strike properly', () => {
        game.roll(10)
        game.roll(5)
        game.roll(2)
        expect(game.score()).toEqual(24)
    })

    test('counts spare properly', () => {
        game.roll(5)
        game.roll(5)
        game.roll(2)
        game.roll(2)
        expect(game.score()).toEqual(16)
    })

    // Integration tests
    test('sample frames', () => {
        game.roll(5)
        game.roll(5)

        expect(game.score()).toEqual(10)

        game.roll(5)
        game.roll(5)

        expect(game.score()).toEqual(25)

        game.roll(10)

        expect(game.score()).toEqual(45)

        game.roll(9)
        game.roll(9)

        expect(game.score()).toEqual(81)

        game.roll(1)
        game.roll(1)

        expect(game.score()).toEqual(84)

        game.roll(10)

        expect(game.score()).toEqual(94)

        game.roll(10)

        expect(game.score()).toEqual(114)

        game.roll(4)
        game.roll(2)

        expect(game.score()).toEqual(130)
    })

    test('perfect game', () => {
        for(let i = 0; i < 11; ++i) {
            game.roll(10)
        }

        expect(game.score()).toEqual(300)

        expect(() => {
            game.roll(10)
        }).toThrow()
    })
})
