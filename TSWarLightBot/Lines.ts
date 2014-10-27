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

import ILines = require('./interface/ILines');
import IAnswer = require('./interface/IAnswer');
import ICommandData = require('./interface/ICommandData');
import ICommandMethod = require('./interface/ICommandMethod');
import Consts = require('./Consts');
import CommandEnum = require('./enum/CommandEnum');
import OptionEnum = require('./enum/OptionEnum');
import ShuffleArray = require('./command/helper/ShuffleArray');
import util = require('util');

/*
 * Converts lines to command information and passes it to the right command class and returns the answer.
 */
class Lines implements ILines {
    constructor(private commandMethodList: ICommandMethod) {
    }

    /*
     * Gets the answer from the bot by passing a command to the right command class.
     * @param line {string} - string containing the command information.
     * @returns {IAnswer} - The command answer.
     * Example : getAnswer('pick_starting_regions 2000 1 7 12 13 18 15 24 25 29 37 42 41');
     * returns :
     *         {
     *             succes: true,
     *             value: '1 7 12 13 18 15'
     *         }
     */
    public getAnswer(line: string): IAnswer {
        var commandData: ICommandData = this.getCommandData(line);
        var commandMethod: (data: ICommandData) => IAnswer = this.commandMethodList[commandData.command];

        if (commandMethod) {
            return commandMethod(commandData);
        } else {
            return {
                succes: false,
                value: util.format(Consts.UNABLE_TO_EXECUTE, line)
            };
        }
    }

    /*
     * Gets a ICommandData instance by converting a string containing the information.
     * @param line {string} - string containing the command information.
     * @returns {ICommandData} - The command information.
     * Example : getCommandData('settings opponent_bot player2');
     * returns :
     *           {
     *               line: 'settings opponent_bot player2',
     *               command: CommandEnum.settings,
     *               option: OptionEnum.opponent_bot,
     *               data: ['player2']
     *           }
     */
    public getCommandData(line: string): ICommandData {
        var lineParts: ShuffleArray<string> = new ShuffleArray<string>(line.trim().split(' '));
        var command: CommandEnum = this.getEnum(lineParts.shift(), CommandEnum);
        var part: string = lineParts.shift();
        var option: OptionEnum = this.getEnum(part, OptionEnum);
        if (option === undefined) {
            lineParts.unshift(part);
        }

        return {
            line: line,
            command: command,
            option: option,
            data: lineParts
        };
    }

    private getEnum(value: string, enumType: any): any {
        if (!value) {
            return undefined;
        }

        // attack/transfer is not a valid enum value. We have to remove te slash.
        value = value.replace('/', '');

        // example
        // enum OptionEnum {
        //    super_regions
        // }
        // we want "0" to return undefined and not "super_regions"
        // "super_regions" will return 0 and pass this test.
        if (typeof enumType[value] === 'string') {
            return undefined;
        }

        return enumType[value];
    }
}

export = Lines;