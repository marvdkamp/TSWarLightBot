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
import ICommandResult = require('ICommandResult');

class Commands implements ICommands {
    constructor(private commandResultFactory: (succes: boolean, value: string) => ICommandResult) {
    } 

    public settings(data: string): void {
    }

    public callCommand(command: string): ICommandResult {
        return this.commandResultFactory(true, 'test');
    }
}

export = Commands;