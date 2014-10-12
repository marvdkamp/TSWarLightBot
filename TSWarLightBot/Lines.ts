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
import ICommandData = require('ICommandData');
import ICommandNameMethod = require('ICommandNameMethod');
import Messages = require('./Messages');
import CommandEnum = require('./CommandEnum');
import util = require('util');
import _ = require('underscore');

class Lines implements ILines {
    constructor(private commandNameMethodList: ICommandNameMethod[]) {
    } 

    public getCommandResult(line: string): ICommandResult {
        var commandData: ICommandData = this.getCommandData(line);
        var commandNameMethod: ICommandNameMethod = _.find(this.commandNameMethodList, (commandNameMethod: ICommandNameMethod) => { 
            return commandNameMethod.command === commandData.command;
        });

        if (commandNameMethod && !(commandNameMethod.method == null)) {
            return commandNameMethod.method([line]);
        } else {
            return {
                succes: false,
                value: util.format(Messages.UNABLE_TO_EXECUTE, line)
            }
        }
    }

    public getCommandData(line: string): ICommandData {
        var lineParts: string[] = line.split(' ');
        return {
            command: CommandEnum[lineParts[0]],
            data: []
        }
    }
}

export = Lines;