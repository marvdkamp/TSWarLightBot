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
import IAnswer = require('./../interface/IAnswer');
import IRegion = require('./../map/interface/IRegion');
import IWarMap = require('./../map/interface/IWarMap');
import ICommandData = require('./../interface/ICommandData');
import IOptionSetting = require('./interface/IOptionSetting');
import OptionEnum = require('../enum/OptionEnum');
import PossibleOwnersEnum = require('../map/enum/PossibleOwnersEnum');

/*
 * Handles update_map command from the game engine. Visible map for the bot is given like this: region id; player owning region; 
 * number of armies.
 */
class UpdateMapCommand implements ICommand {

    constructor(private settings: IOptionSetting, private warMap: IWarMap) {
    }

    /*
     * Gets the answer from the bot for the update_map command.
     * @param data {ICommandData} - Information about the command.
     * @returns {ICommandData} - The command answer.
     * Example: 
     * getAnswer({
     *     line: 'update_map 1 player1 2 2 player1 4 3 neutral 2 4 player2 5',
     *     command: CommandEnum.update_map,
     *     option: undefined,
     *     data: ['1', 'player1', '2', '2', 'player1', '4', '3', 'neutral', '2', '4', 'player2' '5']
     * });
     * returns:
     *      {
     *          succes: true,
     *          value: '1 7 24 25 41 42'
     *      }
     */
    public getAnswer(commandData: ICommandData): IAnswer {
        var region: IRegion;
        var botName: string;
        commandData.data.forEach((value: string, index: number): void => {
            switch ((index + 1) % 3) {
                case 0:
                    region.owner = this.getOwner(botName);
                    region.troopCount = parseInt(value, 10);
                    break;
                case 1:
                    region = this.warMap.getRegionById(parseInt(value, 10));
                    break;
                case 2:
                    botName = value;
                    break;
            }
        });

        return {
            succes: true,
            value: ''
        };
    }

    private getOwner(value: string): PossibleOwnersEnum {
        if (this.settings[OptionEnum.your_bot] === value) {
            return PossibleOwnersEnum.PLAYER;
        }

        if (this.settings[OptionEnum.opponent_bot] === value) {
            return PossibleOwnersEnum.OPPONENT;
        }

        return PossibleOwnersEnum.NEUTRAL;
    }
}

export = UpdateMapCommand;