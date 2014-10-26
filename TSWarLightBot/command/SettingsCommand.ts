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
import IOptionSetting = require('./interface/IOptionSetting');
import OptionEnum = require('../enum/OptionEnum');
import Consts = require('../Consts');
import util = require('util');

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
    constructor(private settings: IOptionSetting) {
        this.optionMethodList[OptionEnum.your_bot] = (commandData: ICommandData): IAnswer => {
            return this.your_bot(commandData);
        };

        this.optionMethodList[OptionEnum.opponent_bot] = (commandData: ICommandData): IAnswer => {
            return this.opponent_bot(commandData);
        };

        this.optionMethodList[OptionEnum.starting_armies] = (commandData: ICommandData): IAnswer => {
            return this.starting_armies(commandData);
        };
    }

    /*
     * Gets the answer from the bot for the settings command.
     * @param data {ICommandData} - Information about the command.
     * @returns {IAnswer} - The command answer.
     * Example: 
     * getAnswer({
     *     line: 'settings your_bot player1',
     *     command: CommandEnum.settings,
     *     option: OptionEnum.your_bot,
     *     data: ['player1']
     * });
     * returns:
     *      {
     *          succes: true,
     *          value: ''
     *      }
     */
    public getAnswer(commandData: ICommandData): IAnswer {
        var optionMethod: (data: ICommandData) => IAnswer = this.optionMethodList[commandData.option];

        if (optionMethod) {
            return optionMethod(commandData);
        } else {
            return {
                succes: false,
                value: util.format(Consts.UNABLE_TO_EXECUTE, commandData.line)
            };
        }
    }

    /*
     * Set the your_bot setting to the players name, retreived from the commandData.data
     */
    public your_bot(commandData: ICommandData): IAnswer {
        this.settings[OptionEnum.your_bot] = commandData.data[0];

        return {
            succes: true,
            value: ''
        };
    }

     /*
     * Set the opponent_bot setting to the players name, retreived from the commandData.data
     */
    public opponent_bot(commandData: ICommandData): IAnswer {
        this.settings[OptionEnum.opponent_bot] = commandData.data[0];

        return {
            succes: true,
            value: ''
        };
    }

     /*
     * Set the starting_armies setting to the players name, retreived from the commandData.data
     */
    public starting_armies(commandData: ICommandData): IAnswer {
        this.settings[OptionEnum.starting_armies] = commandData.data[0];

        return {
            succes: true,
            value: ''
        };
    }
}

export = SettingsCommand;