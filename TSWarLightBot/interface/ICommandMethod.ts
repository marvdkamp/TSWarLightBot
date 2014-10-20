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
'use strict';

import ICommandAnswer = require('./ICommandAnswer');
import CommandEnum = require('./../CommandEnum');
import ICommandData = require('./ICommandData'); 

/**
 * Couples a command to a method which will handle the command.
 */
interface ICommandMethod {

    /**
     * The given command fromm the game engine and the method to handle it.
     */
    [command: number]: (data: ICommandData) => ICommandAnswer;
}

export = ICommandMethod;