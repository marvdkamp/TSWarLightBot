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

import SubCommandEnum = require('./../SubCommandEnum');

/**
 * Couples a subCommand to a value of a Option. The settings command wil send a subcommand which is 
 * actual an option or setting with a value. Een instance of this interface captures these options.
 */
interface ISubCommandMethod {
    subCommand: SubCommandEnum;
    value: string;
}

export = ISubCommandMethod;