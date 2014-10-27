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
import IWarMap = require('./../map/interface/IWarMap');
import IRegion = require('./../map/interface/IRegion');
import OptionEnum = require('../enum/OptionEnum');
import Consts = require('../Consts');
import util = require('util');
import Region = require('../map/Region');
import SuperRegion = require('../map/SuperRegion');

/*
 * Handles setup_map command from the game engine. The regions are given, The superregions are given and the connectivity 
 * of the regions are given in different calls
 */
class SetupMapCommand implements ICommand {
    private optionMethodList: ICommandMethod = {};

    /*
     * Create an instance of the Setup_map class.
     * @constructor
     */
    constructor(private warMap: IWarMap) {
        this.optionMethodList[OptionEnum.super_regions] = (commandData: ICommandData): IAnswer => {
            return this.super_regions(commandData);
        };

        this.optionMethodList[OptionEnum.regions] = (commandData: ICommandData): IAnswer => {
            return this.regions(commandData);
        };

        this.optionMethodList[OptionEnum.neighbors] = (commandData: ICommandData): IAnswer => {
            return this.neighbors(commandData);
        };
    }

    /*
     * Gets the answer from the bot for the setup_map command.
     * @param data {ICommandData} - Information about the command.
     * @returns {ICommandData} - The command answer.
     * Example: 
     * getAnswer({
     *     line: 'setup_map super_regions 1 2 2 5',
     *     command: CommandEnum.setup_map,
     *     option: OptionEnum.super_regions,
     *     data: ['1', '2', '2', '5']
     * });
     * returns:
     *      {
     *         succes: true,
     *         value: '1 7 24 25 41 42'
     *      }
     */
    public getAnswer(commandData: ICommandData): IAnswer {
        return null;
    }

    public super_regions(commandData: ICommandData): IAnswer {
        return null;
    }

    public regions(commandData: ICommandData): IAnswer {
        return null;
    }

    public neighbors(commandData: ICommandData): IAnswer {
        return null;
    }
}

export = SetupMapCommand;