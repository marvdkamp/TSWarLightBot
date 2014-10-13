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

/**
 * Handles pick_starting_regions command from the game engine. Request for the bot to return his place armies moves and request for the bot to 
 * return his attack and/or transfer moves.
 */
class Pick_starting_regions implements ICommand {
    /**
     * Gets the answer from the bot for the pick_starting_regions command.
     * @param data {ICommandData} - Information about the command.
     * @returns {ICommandData} - The command answer.
     * Example: 
     * getCommandResult({ 
     *     command: CommandEnum.pick_starting_regions,
     *     subCommand: undefined,
     *     data: ['2000']
     * });
     */
    public getCommandResult(data: ICommandData): ICommandResult {
        return null;
    }
}

export = Pick_starting_regions;