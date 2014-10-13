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

import ICommand = require('ICommand');
import ICommandResult = require('ICommandResult');
import ICommandData = require('ICommandData');

class Pick_starting_regions implements ICommand {
    public getCommandResult(data: ICommandData): ICommandResult {
        return null;
    }
}

export = Pick_starting_regions;