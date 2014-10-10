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

import ILines = require('ILines');
import ICommandResult = require('ICommandResult');
import ICommandNameMethod = require('ICommandNameMethod');
import _ = require('underscore');

class Lines implements ILines {
    constructor(private commandNameMethod: ICommandNameMethod[]) {
    } 

    public getCommandResult(data: string): ICommandResult {
        var commandNameMethod: ICommandNameMethod = _.find(this.commandNameMethod, (commandNameMethodItem: ICommandNameMethod) => { 
            return commandNameMethodItem.commandName === data;
        });

        return commandNameMethod.method([data]);
    }
}

export = Lines;