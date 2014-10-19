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

import ICommand = require('./interface/ICommand');
import ICommandAnswer = require('./../interface/ICommandAnswer');
import ICommandData = require('./../interface/ICommandData');

/**
 * Handles update_map command from the game engine. Visible map for the bot is given like this: region id; player owning region; 
 * number of armies.
 */
class Update_mapCommand implements ICommand {

    /**
     * Gets the answer from the bot for the update_map command.
     * @param data {ICommandData} - Information about the command.
     * @returns {ICommandData} - The command answer.
     * Example: 
     * getCommandAnswer({
     *     line: 'update_map 1 player1 2 2 player1 4 3 neutral 2 4 player2 5',
     *     command: CommandEnum.update_map,
     *     option: undefined,
     *     data: ['1', 'player1', '2', '2', 'player1', '4', '3', 'neutral', '2', '4', 'player2' '5']
     * });
     *
     * Example return:
     * {
     *     succes: true,
     *     value: '1 7 24 25 41 42'
     * }
     */
    public getCommandAnswer(commandData: ICommandData): ICommandAnswer {
        return null;
    }
}

export = Update_mapCommand;