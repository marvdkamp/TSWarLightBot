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
import ICommandMethod = require('./../interface/ICommandMethod');
import ICommandAnswer = require('./../interface/ICommandAnswer');
import ICommandData = require('./../interface/ICommandData');
import SubCommandEnum = require('../SubCommandEnum');

/**
 * Handles setup_map command from the game engine. The regions are given, The superregions are given and the connectivity 
 * of the regions are given in different calls
 */
class Setup_map implements ICommand {
    private subCommandMethodList: ICommandMethod = {};

    /**
     * Create an instance of the Setup_map class.
     * @constructor
     */
    constructor() {
        this.subCommandMethodList[SubCommandEnum.super_regions] = (commandData: ICommandData) => { 
            return this.super_regions(commandData)
        };

        this.subCommandMethodList[SubCommandEnum.regions] = (commandData: ICommandData) => { 
            return this.regions(commandData)
        };

        this.subCommandMethodList[SubCommandEnum.neighbors] = (commandData: ICommandData) => { 
            return this.neighbors(commandData)
        };
    } 

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
     * 
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

    public super_regions(commandData: ICommandData): ICommandAnswer {
        return null;
    }

    public regions(commandData: ICommandData): ICommandAnswer {
        return null;
    }

    public neighbors(commandData: ICommandData): ICommandAnswer {
        return null;
    }
}

export = Setup_map;