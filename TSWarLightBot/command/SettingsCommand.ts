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

import ICommand = require('./interface/ICommand');
import ICommandMethod = require('./../interface/ICommandMethod');
import IAnswer = require('./../interface/IAnswer');
import ICommandData = require('./../interface/ICommandData');
import OptionEnum = require('../enum/OptionEnum');

/*
 * Handles settings command from the game engine. The name of your bot is given, the name of your opponent bot is given 
 * and the amount of armies your bot can place on the map at the start of this round
 */
class SettingsCommand implements ICommand {
    private optionMethodList: ICommandMethod = {};

    /*
     * Create an instance of the Settings class.
     * @constructor
     */
    constructor() {
        this.optionMethodList[OptionEnum.your_bot] = (commandData: ICommandData): IAnswer => {
            return this.your_bot(commandData);
        };

        this.optionMethodList[OptionEnum.opponent_bot] = (commandData: ICommandData): IAnswer => {
            return this.opponent_bot(commandData);
        };
    }

    /*
     * Gets the answer from the bot for the settings command.
     * @param data {ICommandData} - Information about the command.
     * @returns {ICommandData} - The command answer.
     * Example: 
     * getAnswer({
     *     line: 'settings your_bot player1',
     *     command: CommandEnum.settings,
     *     option: OptionEnum.your_bot,
     *     data: ['player1']
     * });
     *
     * Example return:
     * {
     *     succes: true,
     *     value: '1 7 24 25 41 42'
     * }
     */
    public getAnswer(commandData: ICommandData): IAnswer {
        return null;
    }

    public your_bot(commandData: ICommandData): IAnswer {
        return null;
    }

    public opponent_bot(commandData: ICommandData): IAnswer {
        return null;
    }
}

export = SettingsCommand;