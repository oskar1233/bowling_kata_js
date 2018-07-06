const Game = require('./app.js');

describe('Test Bowling Game', () => {

    let game;

    beforeEach(() => {
        game = new Game();
    });

    test('score returns sum of rolls', () => {
        game.roll(5);
        game.roll(5);
        expect(game.score()).toEqual(10);
    });

});
