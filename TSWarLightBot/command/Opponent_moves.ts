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
 * Handles opponent_moves command from the game engine. All the visible moves the opponent has done are given in consecutive order.
 */
class Opponent_moves implements ICommand {

    /**
     * Gets the answer from the bot for the go command.
     * @param data {ICommandData} - Information about the command.
     * @returns {ICommandData} - The command answer.
     * Isn't used in the starter bot. 
     * TODO: Find out what the data looks like.
     * Example: 
     * getCommandAnswer({
     *     line: 'opponent_moves',
     *     command: CommandEnum.opponent_moves,
     *     subCommand: undefined,
     *     data: []
     * });
     * 
     * Example return:
     * {
     *     succes: true,
     *     value: ''
     * }
     */
    public getCommandAnswer(commandData: ICommandData): ICommandAnswer {
        return null;
    }
}

export = Opponent_moves;