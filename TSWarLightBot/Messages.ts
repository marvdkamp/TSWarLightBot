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
 * Holds message's prevents retyping it everywhere.
 */
class Messages {
    public static get UNABLE_TO_EXECUTE(): string { return 'Unable to execute command: %s\n'; }
}

export = Messages;