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

import ICommandAnswer = require('./../ICommandAnswer');
import SubCommandEnum = require('./../SubCommandEnum');
import ICommandData = require('./../ICommandData');

/**
 * Couples a subCommand to a method which will handle the subCommand.
 */
interface ISubCommandMethod {

    /**
     * The given command fromm the game engine.
     */
    command: SubCommandEnum;

    /**
     * The method which will handle the command.
     */
    method: (commandData: ICommandData) => ICommandAnswer;
}

export = ISubCommandMethod;