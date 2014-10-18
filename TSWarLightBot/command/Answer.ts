/**
 * Warlight AI Game Bot
 *
 * Oktober 2014
 *
 * Based on Niko van Meurs javascript bot from http://theaigames.com/competitions/warlight-ai-challenge/getting-started
 *
 * @authors Marcel van de Kamp and Taeke van der Veen
 * @License MIT License (http://opensource.org/Licenses/MIT)
 */
'use strict';

/**
 * Holds the fixed parts of the answer's the Bot gives.
 */
class Answer {
    public static get PLACE_ARMIES(): string { return 'place_armies'; }
    public static get ATTACK_TRANSFER(): string { return 'attack/transfer'; }
    public static get NO_MOVES(): string { return 'No moves'; }
}

export = Answer;