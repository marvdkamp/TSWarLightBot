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
import ISubCommandOption = require('./ISubCommandOption');
import ICommandMethod = require('./../ICommandMethod');
import ICommandAnswer = require('./../ICommandAnswer');
import ICommandData = require('./../ICommandData');
import IMoveData = require('./../command/IMoveData');
import CommandEnum = require('../CommandEnum');
import SubCommandEnum = require('../SubCommandEnum');
import IWarMap = require('../map/I/IWarMap');
import IRegion = require('../map/I/IRegion');
import PossibleOwners = require('../map/PossibleOwners');
import Consts = require('../Consts');
import util = require('util');

/**
 * Handles go command from the game engine. Request for the bot to return his place armies moves  and request for the bot 
 * to return his attack and/or transfer moves.
 */
class Go implements ICommand {
    private subCommandMethodList: ICommandMethod = {};

    /**
     * Create an instance of the Go class.
     * @constructor
     * @param options {ISubCommandOption} - Options with information needed by this command.
     * @param warMap {IWarMap} - Information about the map on which the game is played.
     */
    constructor(private options: ISubCommandOption, private warMap: IWarMap) {
        this.subCommandMethodList[SubCommandEnum.place_armies] = (commandData: ICommandData) => { 
                return this.place_armies(commandData)
            };

        this.subCommandMethodList[SubCommandEnum.attacktransfer] = (commandData: ICommandData) => { 
                return this.attacktransfer(commandData)
            };
    } 

    /**
     * Gets the answer from the bot for the go command.
     * @param data {ICommandData} - Information about the command.
     * @returns {ICommandData} - The command answer.
     * Example: 
     * getCommandAnswer({ 
     *     line: 'go place_armies 2000'
     *     command: CommandEnum.go,
     *     subCommand: SubCommandEnum.place_armies,
     *     data: ['2000']
     * });
     * 
     * Example return:
     * {
     *     succes: true,
     *     value: 'player1 place_armies 1 1, player1 place_armies 1 1, player1 place_armies 1 1'
     * }
     */
    public getCommandAnswer(commandData: ICommandData): ICommandAnswer {
        var subCommandMethod: (data: ICommandData) => ICommandAnswer = this.subCommandMethodList[commandData.subCommand];

        if (subCommandMethod) {
            return subCommandMethod(commandData);
        } else {
            return {
                succes: false,
                value: util.format(Consts.UNABLE_TO_EXECUTE, commandData.line)
            }
        }
    }

    /**
     * Gets the answer from the bot for the go command with the place_armies subCommand.
     * @param data {ICommandData} - Information about the command.
     * @returns {ICommandData} - The command answer.
     * Example: getCommandAnswer({ 
     *             line: 'go place_armies 2000'
     *             command: CommandEnum.go,
     *             subCommand: SubCommandEnum.place_armies,
     *             data: ['2000']
     *          });
     * 
     * Example return:
     * {
     *     succes: true,
     *     value: 'player1 place_armies 1 1, player1 place_armies 1 1, player1 place_armies 1 1'
     * }
     */
    public place_armies(commandData: ICommandData): ICommandAnswer {
        var ownedRegions: IRegion[] = this.warMap.getOwnedRegions(PossibleOwners.PLAYER);
        var troopsRemaining: number = parseInt(this.options[SubCommandEnum.starting_armies], 10);
        var placements: string[] = [];

        while (0 < troopsRemaining) {
            var index: number = Math.random() * ownedRegions.length;
            ownedRegions[index].troopCount += 1;
            placements.push([this.options[SubCommandEnum.your_bot], Consts.PLACE_ARMIES, ownedRegions[index].id, '1'].join(' '));
            troopsRemaining -= 1;
        }

        return {
            succes: true,
            value: placements.join(', ').trim()
        }
    }

    /**
     * Gets the answer from the bot for the go command with the place_armies subCommand.
     * @param data {ICommandData} - Information about the command.
     * @returns {ICommandData} - The command answer.
     * Example: getCommandAnswer({ 
     *             line: 'go attack/transfer 2000'
     *             command: CommandEnum.go,
     *             subCommand: SubCommandEnum.attacktransfer,
     *             data: ['2000']
     *          });
     * 
     * Example return:
     * {
     *     succes: true,
     *     value: 'player1 attack/transfer 1 3 5, player1 attack/transfer 2 1 2'
     * }
     */
    public attacktransfer(commandData: ICommandData): ICommandAnswer {
        var moves: string[] = [];
        var ownedRegions: IRegion[] = this.warMap.getOwnedRegions(PossibleOwners.PLAYER);
        var moveData: IMoveData[] = this.getRegionsToAttackTransfer(ownedRegions, false, Consts.MINIMUM_TROOPS_FOR_ATTACK);
        moveData = moveData.concat(this.getRegionsToAttackTransfer(ownedRegions, true, Consts.MINIMUM_TROOPS_FOR_TRANSFER));
        moveData.forEach((move: IMoveData) => {
            moves.push([this.options[SubCommandEnum.your_bot],
                Consts.ATTACK_TRANSFER,
                move.moveFrom.id.toString(),
                move.moveTo.id.toString(),
                (move.moveFrom.troopCount - 1).toString()].join(' '));
            move.moveFrom.troopCount = 1;
        });

        return {
            succes: true,
            value: moves.join(', ').trim()
        }
    }

    /**
     * Gets the regions which the bot could attack or transfer troops to.
     * @param ownedRegions {IRegion[]} - Regions from which the attack or tranfer starts. The neighbors are the region are potential
     *                                   regions to attack or transfer to.
     * @param own {boolean} - If own is true it is a transfer and are we look for neighbors we allready own. Otherwise it's a attack.
     * @param numberOfTroops {number} - The number of troops which should be on the region the transfer or attack starts from
     *                                  before we transfer or attack.
     * @returns {IMoveData} - Information about the move.
     * Example: getRegionsToAttackTransfer([ { id : 1, superRegion : null, owner : 2, neighbors : 
     *                                       [ { id : 2, superRegion : null, owner : 2, neighbors : [  ], troopCount : 1, isOnEmpireBorder : false, isOnSuperRegionBorder : false }, 
     *                                         { id : 3, superRegion : null, owner : 1, neighbors : [  ], troopCount : 1, isOnEmpireBorder : false, isOnSuperRegionBorder : false }, 
     *                                         { id : 4, superRegion : null, owner : 0, neighbors : [  ], troopCount : 1, isOnEmpireBorder : false, isOnSuperRegionBorder : false } ], troopCount : 1, isOnEmpireBorder : false, isOnSuperRegionBorder : false }, 
     *                                       { id : 2, superRegion : null, owner : 2, neighbors : [  ], troopCount : 1, isOnEmpireBorder : false, isOnSuperRegionBorder : false } ], false, 7)
     * 
     * Example return:
     *           {
     *               moveTo: { id : 3, superRegion : null, owner : 1, neighbors : [  ], troopCount : 1, isOnEmpireBorder : false, isOnSuperRegionBorder : false }
     *               moveFrom: { id : 1, superRegion : null, owner : 2, neighbors : 
     *                         [ { id : 2, superRegion : null, owner : 2, neighbors : [  ], troopCount : 1, isOnEmpireBorder : false, isOnSuperRegionBorder : false }, 
     *                           { id : 3, superRegion : null, owner : 1, neighbors : [  ], troopCount : 1, isOnEmpireBorder : false, isOnSuperRegionBorder : false }, 
     *                           { id : 4, superRegion : null, owner : 0, neighbors : [  ], troopCount : 1, isOnEmpireBorder : false, isOnSuperRegionBorder : false } ], troopCount : 1, isOnEmpireBorder : false, isOnSuperRegionBorder : false }
     *           } 
     */
    public getRegionsToAttackTransfer(ownedRegions: IRegion[], own: boolean, numberOfTroops: number): IMoveData[]{
        var result: IMoveData[] = [];
        ownedRegions.forEach((region: IRegion) => {
            var possibleAttacks: IRegion[] = region.neighbors.filter((neighbor: IRegion) => {
                return ((neighbor.owner === PossibleOwners.PLAYER && own) || (neighbor.owner !== PossibleOwners.PLAYER && !own));
            });
            if (region.troopCount >= numberOfTroops && possibleAttacks.length > 0) {
                result.push({ moveTo: possibleAttacks[0], moveFrom: region })
            };
        });

        return result;
    }
}

export = Go;