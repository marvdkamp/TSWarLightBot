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
import ICommandAction = require('ICommandAction');
import _ = require('underscore');

class Lines implements ILines {
    constructor(private commandActions: ICommandAction[]) {
    } 

    public callCommand(data: string): ICommandResult {
        var commandAction: ICommandAction = _.find(this.commandActions, (commandAction: ICommandAction) => { 
            return commandAction.command === data;
        });

        return commandAction.action([data]);
    }
}

export = Lines;