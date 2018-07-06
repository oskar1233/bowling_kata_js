class Game {

    constructor() {
        this.rolls = [];
    }

    roll(pins) {
        this.rolls.push(pins);
    }

    score() {
        return this.rolls.reduce((accumulator, currentValue) => accumulator + currentValue);
    }

}

module.exports = Game;
