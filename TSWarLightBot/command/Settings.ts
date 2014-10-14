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

import ICommand = require('./ICommand');
import ICommandAnswer = require('./../ICommandAnswer');
import ICommandData = require('./../ICommandData');

/**
 * Handles settings command from the game engine. The name of your bot is given, the name of your opponent bot is given 
 * and the amount of armies your bot can place on the map at the start of this round
 */
class Settings implements ICommand {

    /**
     * Gets the answer from the bot for the settings command.
     * @param data {ICommandData} - Information about the command.
     * @returns {ICommandData} - The command answer.
     * Example: 
     * getCommandAnswer({
     *     line: 'settings your_bot player1',
     *     command: CommandEnum.settings,
     *     subCommand: SubCommandEnum.your_bot,
     *     data: ['player1']
     * });
     */
    public getCommandAnswer(commandData: ICommandData): ICommandAnswer {
        return null;
    }
}

export = Settings;