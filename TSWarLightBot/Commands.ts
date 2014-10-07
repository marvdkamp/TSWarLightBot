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

import ICommands = require('ICommands');
import CommandResult = require('CommandResult');

class Commands implements ICommands {
    public settings(data: string): void {
    }

    public callCommand(command: string): CommandResult {
        return new CommandResult(true, 'test');
    }
}

export = Commands;