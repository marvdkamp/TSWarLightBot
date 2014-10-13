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
import CommandEnum = require('./CommandEnum');
import util = require('util');
import _ = require('underscore');

/**
 * Converts lines to command information and passes it to the right command class and returns the answer.
 */
class Lines implements ILines {
    constructor(private commandNameMethodList: ICommandNameMethod[]) {
    } 

    /**
     * Gets the answer from the bot by passing a command to the right command class.
     * @param line {string} - string containing the command information.
     * Example : getCommandResult('pick_starting_regions 2000 1 7 12 13 18 15 24 25 29 37 42 41');
     */
    public getCommandResult(line: string): ICommandResult {
        var commandData: ICommandData = this.getCommandData(line);
        var commandNameMethod: ICommandNameMethod = _.find(this.commandNameMethodList, (commandNameMethod: ICommandNameMethod) => { 
            return commandNameMethod.command === commandData.command;
        });

        if (commandNameMethod && !(commandNameMethod.method == null)) {
            return commandNameMethod.method(commandData);
        } else {
            return {
                succes: false,
                value: util.format(Messages.UNABLE_TO_EXECUTE, line)
            }
        }
    }

    /**
     * Gets a ICommandData by converting a string containing the information.
     * @param line {string} - string containing the command information.
     * @returns {ICommandData} - The command information.
     * Example : getCommandData('settings opponent_bot player2');
     */
    public getCommandData(line: string): ICommandData {
        var lineParts: string[] = line.split(' ');
        return {
            command: CommandEnum[lineParts[0]],
            data: []
        }
    }
}

export = Lines;