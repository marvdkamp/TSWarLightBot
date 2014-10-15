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
import ISubCommandMethod = require('./ISubCommandMethod');
import ICommandAnswer = require('./../ICommandAnswer');
import ICommandData = require('./../ICommandData');
import SubCommandEnum = require('../SubCommandEnum');

/**
 * Handles settings command from the game engine. The name of your bot is given, the name of your opponent bot is given 
 * and the amount of armies your bot can place on the map at the start of this round
 */
class Settings implements ICommand {
    private subCommandMethodList: ISubCommandMethod[] = [];

    constructor() {
        this.subCommandMethodList.push({
            subCommand: SubCommandEnum.your_bot,
            method: (commandData: ICommandData) => { 
                return this.your_bot(commandData)
            }
        });

        this.subCommandMethodList.push({
            subCommand: SubCommandEnum.opponent_bot,
            method: (commandData: ICommandData) => { 
                return this.opponent_bot(commandData)
            }
        });
    } 

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

    public your_bot(commandData: ICommandData): ICommandAnswer {
        return null;
    }

    public opponent_bot(commandData: ICommandData): ICommandAnswer {
        return null;
    }
}

export = Settings;