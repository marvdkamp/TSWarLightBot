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

import CommandEnum = require('./../enum/CommandEnum');
import OptionEnum = require('./../enum/OptionEnum');
import ShuffleArray = require('../command/helper/ShuffleArray');

/*
 * Information about the command from the game engine.
 */
interface ICommandData {

    /*
     * Original command string.
     */
    line: string;

    /*
     * Which command.
     */
    command: CommandEnum;

    /*
     * Which option.
     */
    option?: OptionEnum;

    /*
     * Arguments given by the command.
     */
    data: ShuffleArray<string>;
}

export = ICommandData;