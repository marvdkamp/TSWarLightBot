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

import SubCommandEnum = require('./../../enum/SubCommandEnum');

/**
 * Couples a subCommand to a value of a Option. The settings command wil send a subcommand which is 
 * actual an option or setting with a value. Een instance of this interface captures these options.
 */
interface ISubCommandOption {
    [command: number]: string;
}

export = ISubCommandOption;