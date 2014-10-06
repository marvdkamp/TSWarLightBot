/**
 * Warlight AI Game Bot
 *
 * Oktober 2014
 *
 * Based on Niko van Meurs javascript bot from http://theaigames.com/competitions/warlight-ai-challenge/getting-started
 *
 * @authors Marcel van der Kamp and Taeke van der Veen
 * @License MIT License (http://opensource.org/Licenses/MIT)
 */

import IBotCommands = require('IBotCommands');

class BotCommands implements IBotCommands {
    public settings(data: string): void {
    }

    public isACommand(command: string): boolean {
        return true;
    }

    public callCommand(command: string): void {
    }
}

export = BotCommands;