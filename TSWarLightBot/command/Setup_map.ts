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

import ICommand = require('./ICommand');
import ICommandAnswer = require('./../ICommandAnswer');
import ICommandData = require('./../ICommandData');

/**
 * Handles setup_map command from the game engine. The regions are given, The superregions are given and the connectivity 
 * of the regions are given in different calls
 */
class Setup_map implements ICommand {

    /**
     * Gets the answer from the bot for the setup_map command.
     * @param data {ICommandData} - Information about the command.
     * @returns {ICommandData} - The command answer.
     * Example: 
     * getCommandAnswer({
     *     line: 'setup_map super_regions 1 2 2 5',
     *     command: CommandEnum.setup_map,
     *     subCommand: SubCommandEnum.super_regions,
     *     data: ['1', '2', '2', '5']
     * });
     */
    public getCommandAnswer(commandData: ICommandData): ICommandAnswer {
        return null;
    }
}

export = Setup_map;