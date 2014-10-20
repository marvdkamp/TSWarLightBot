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
 * Couples a subCommand to a value of a Setting. The settings command wil have a subcommand which is 
 * a specific setting with its value. Een array of instances of this interface captures these settings.
 */
interface IOptionSetting {
    [subCommand: number]: string;
}

export = IOptionSetting;