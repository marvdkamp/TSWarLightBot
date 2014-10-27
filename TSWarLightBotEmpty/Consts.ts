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
'use strict';

/*
 * Holds message's prevents retyping it everywhere.
 */
class Consts {
    public static get UNABLE_TO_EXECUTE(): string { return 'Unable to execute command: %s\n'; }
    public static get NOT_ENOUGHT_REGIONS(): string { return 'There are not enough regions in the command %s to pick from.\n'; }
    public static get PLACE_ARMIES(): string { return 'place_armies'; }
    public static get ATTACK_TRANSFER(): string { return 'attack/transfer'; }
    public static get NO_MOVES(): string { return 'No moves'; }
    public static get MINIMUM_TROOPS_FOR_ATTACK(): number { return 7; }
    public static get MINIMUM_TROOPS_FOR_TRANSFER(): number { return 2; }
    public static get NUMBER_OF_REGIONS_TO_PICK(): number { return 6; }
}

export = Consts;