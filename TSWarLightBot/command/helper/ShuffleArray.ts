/* 
 * Warlight AI Game Bot
 *
 * Oktober 2014
 *
 * Based on Niko van Meurs javascript bot from http://theaigames.com/competitions/warlight-ai-challenge/getting-started
 *
 * @authors Marcel van de Kamp and Taeke van der Veen
 * @License MIT License (http://opensource.org/Licenses/MIT)
 */

// Based on http://stackoverflow.com/questions/14000645/how-to-extend-native-javascipt-array-in-typescript
// and on http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

import DummyArray = require('./DummyArray');

// Add a shuffle method to the array class.
class ShuffleArray<T> extends DummyArray<T> {
    public shuffle(): ShuffleArray<T> {
        var currentIndex: number = this.length;
        var temporaryValue: number;
        var randomIndex: number;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this[currentIndex];
            this[currentIndex] = this[randomIndex];
            this[randomIndex] = temporaryValue;
        }

        return this;
    }
}

export = ShuffleArray;


