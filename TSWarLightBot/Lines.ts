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

import ILines = require('ILines');
import ICommandResult = require('ICommandResult');
import ICommandData = require('ICommandData');
import ICommandNameMethod = require('ICommandNameMethod');
import Messages = require('./Messages');
import util = require('util');
import _ = require('underscore');

class Lines implements ILines {
    constructor(private commandNameMethod: ICommandNameMethod[]) {
    } 

    public getCommandResult(data: string): ICommandResult {
        var commandData: ICommandData = this.getCommandData(data);
        var commandNameMethod: ICommandNameMethod = _.find(this.commandNameMethod, (commandNameMethodItem: ICommandNameMethod) => { 
            return commandNameMethodItem.commandName === commandData.commandName;
        });

        if (commandNameMethod) {
            return commandNameMethod.method([data]);
        } else {
            return {
                succes: false,
                value: util.format(Messages.UNABLE_TO_EXECUTE, commandData.commandName, commandData.data.join(' '))
            }
        }
    }

    public getCommandData(data: string): ICommandData {
        return null;
    }
}

export = Lines;