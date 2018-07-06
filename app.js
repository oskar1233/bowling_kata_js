class Game {

    constructor() {
        // Is current roll even
        this._even = false

        // Played frames count
        this._frames = 0

        // Previous roll
        this._prev = 0

        // Current score
        this._score = 0

        // How many steps further count double
        this._bonus = 0

        // Should we count bonus two times; for double strikes
        this._doubleBonus = 0
    }

    /**
     * Add roll.
     *
     * Changes points accordingly to the roll's value.
     *
     * @param {integer} pins Value of current roll
     *
     * @return undefined
     *
     * @throws {Error} Thrown if `pins` are not valid value regarding current state 
     */
    roll(pins) {
        const _err = this._validateRoll(pins)
        if(_err) throw new Error(_err)

        // Add points
        if(this._bonus > 0) {
            if(this._doubleBonus) {
                this._score += 3*pins
                this._doubleBonus = false
            } else {
                this._score += 2*pins
            }
            --this._bonus
        } else {
            this._score += pins
        }

        // Check for bonuses
        if(!this._even && pins == 10) { // Strike
            if(this._bonus > 0) this._doubleBonus = true

            this._bonus = 2
            this._even  = true // Act as like current roll is even
        } else if(this._even && pins + this._prev >= 10) { // Spare
            this._bonus = 1
        }

        // Proceed to next roll with valid values
        if(this._even) ++this._frames
        this._prev = pins
        this._even = !this._even
    }

    score() {
        return this._score
    }

    /**
     * Validate roll.
     *
     * Throws exception in case of error.
     *
     * @param {integer} curr Roll to be verified
     *
     * @return {null|string} Error message or null
     */
    _validateRoll(curr) {
        if(curr > 10) return "Invalid input; too many points."

        if(this._frames > 10) return "Invalid input; too many rolls."
        if(this._frames == 10 && this._bonus == 0) return "Invalid input; too many rolls."

        return null
    }

}

module.exports = Game
