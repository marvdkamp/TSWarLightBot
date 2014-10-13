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

import ICommandResult = require('ICommandResult');
import CommandEnum = require('./CommandEnum');
import ICommandData = require('./ICommandData'); 

/**
 * Couples a command to a method which will handle the command.
 */
interface ICommandNameMethod {

    /**
     * The given command fromm the game engine.
     */
    command: CommandEnum;

    /**
     * The method which will handle the command.
     */
    method: (data: ICommandData) => ICommandResult;
}

export = ICommandNameMethod;