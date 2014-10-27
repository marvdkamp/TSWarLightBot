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

import IAnswer = require('IAnswer');
import ICommandData = require('ICommandData');

/*
 * Converts lines to command information and passes it to the right command class and returns the answer.
 */
interface ILines {

    /*
     * Gets the answer from the bot by passing a command to the right command class.
     * @param line {string} - string containing the command information.
     * Example : getAnswer('pick_starting_regions 2000 1 7 12 13 18 15 24 25 29 37 42 41');
     */
    getAnswer(line: string): IAnswer;

    /*
     * Gets a ICommandData instance by converting a string containing the information.
     * @param line {string} - string containing the command information.
     * @returns {ICommandData} - The command information.
     * Example : getCommandData('settings opponent_bot player2');
     *           {
     *               line: 'settings opponent_bot player2',
     *               command: CommandEnum.settings,
     *               option: OptionEnum.opponent_bot,
     *               data: ['player2']
     *           }
     */
    getCommandData(line: string): ICommandData;
}

export = ILines;