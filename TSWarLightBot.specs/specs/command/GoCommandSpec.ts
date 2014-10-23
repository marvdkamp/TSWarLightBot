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

/// <reference path="../../Scripts/typings/jasmine/legacy/jasmine-1.3.d.ts" />

'use strict';

import CommandEnum = require('../../../TSWarLightBot/enum/CommandEnum');
import OptionEnum = require('../../../TSWarLightBot/enum/OptionEnum');
import IOptionSetting = require('../../../TSWarLightBot/command/interface/IOptionSetting');
import ICommandData = require('../../../TSWarLightBot/interface/ICommandData');
import ICommandAnswer = require('../../../TSWarLightBot/interface/ICommandAnswer');
import IMoveData = require('../../../TSWarLightBot/command/interface/IMoveData');
import Consts = require('../../../TSWarLightBot/Consts');
import PossibleOwnersEnum = require('../../../TSWarLightBot/map/enum/PossibleOwnersEnum');
import IRegion = require('../../../TSWarLightBot/map/interface/IRegion');
import util = require('util');

describe('goCommand', (): void => {
    var GoCommand: any = require('../../../TSWarLightBot/command/GoCommand');
    var goCommand: any;
    var commandPlaceArmiesData: ICommandData = {
        line: 'go place_armies 2000',
        command: CommandEnum.go,
        option: OptionEnum.place_armies,
        data: ['2000']
    };

    var commandAttackTransferData: ICommandData = {
        line: 'go attack/transfer 2000',
        command: CommandEnum.go,
        option: OptionEnum.attacktransfer,
        data: ['2000']
    };

    var settings: IOptionSetting = {};
    var regions: IRegion[];
    var ownedRegions: IRegion[];
    var warMap: any = jasmine.createSpyObj('warMap', ['getOwnedRegions']);
    var yourBotName: string = 'player1';

    beforeEach((): void => {
        regions = createMockRegions();
        ownedRegions = [];
        ownedRegions.push(regions[0]);
        ownedRegions.push(regions[1]);
        warMap.getOwnedRegions.andReturn(ownedRegions);
        goCommand = new GoCommand(settings, warMap);
    });

    function createMockRegions(): IRegion[] {
        var result: IRegion[] = [{
            id: 1,
            superRegion: null,
            owner: PossibleOwnersEnum.PLAYER,
            neighbors: [],
            troopCount: 1,
            isOnEmpireBorder: false,
            isOnSuperRegionBorder: false
        }, {
            id: 2,
            superRegion: null,
            owner: PossibleOwnersEnum.PLAYER,
            neighbors: [],
            troopCount: 1,
            isOnEmpireBorder: false,
            isOnSuperRegionBorder: false
        }, {
            id: 3,
            superRegion: null,
            owner: PossibleOwnersEnum.OPPONENT,
            neighbors: [],
            troopCount: 1,
            isOnEmpireBorder: false,
            isOnSuperRegionBorder: false
        }, {
            id: 4,
            superRegion: null,
            owner: PossibleOwnersEnum.NEUTRAL,
            neighbors: [],
            troopCount: 1,
            isOnEmpireBorder: false,
            isOnSuperRegionBorder: false
        }];

        result[0].neighbors.push(result[1]);
        result[0].neighbors.push(result[2]);
        result[0].neighbors.push(result[3]);

        // We don't need this => Connectivity is only given in one way: 'region id' < 'neighbour id'.
        // result[1].neighbors.push(result[0]);

        return result;
    }

    describe('getCommandAnswer', (): void => {
        it('Should call right option method on goCommand if ICommandData.option matches.', (): void => {
            // arange
            spyOn(Math, 'random').andReturn(0);
            spyOn(goCommand, 'place_armies');

            // act
            goCommand.getCommandAnswer(commandPlaceArmiesData);

            // assert
            expect(goCommand.place_armies).toHaveBeenCalledWith(commandPlaceArmiesData);
            expect(goCommand.place_armies.callCount).toBe(1);
        });

        // error string should be filled too.
        it('Should return CommandAnswer.succes = false in CommandAnswer.value if ICommandData.option not matches.', (): void => {
            // arange
            spyOn(Math, 'random').andReturn(0);
            commandPlaceArmiesData.option = OptionEnum.neighbors;
            commandPlaceArmiesData.line = 'go neighbors 2000';

            // act
            var result: ICommandAnswer = goCommand.getCommandAnswer(commandPlaceArmiesData);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandPlaceArmiesData.line));
        });

        // error string should be filled too.
        it('Should return CommandAnswer.succes = false in CommandAnswer.value if ICommandData.option is undefined.', (): void => {
            // arange
            spyOn(Math, 'random').andReturn(0);
            commandPlaceArmiesData.option = undefined;
            commandPlaceArmiesData.line = 'go 2000';

            // act
            var result: ICommandAnswer = goCommand.getCommandAnswer(commandPlaceArmiesData);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandPlaceArmiesData.line));
        });
    });

    describe('place_armies', (): void => {
        // Should call it only once and with PossibleOwnersEnum.PLAYER.
        it('Should call getOwnedRegions on warMap', (): void => {
            // arange
            spyOn(Math, 'random').andReturn(0);

            // act
            goCommand.place_armies(commandPlaceArmiesData);

            // assert
            expect(warMap.getOwnedRegions).toHaveBeenCalledWith(PossibleOwnersEnum.PLAYER);
            expect(warMap.getOwnedRegions.callCount).toBe(1);
        });

        // settings gets injected and holds OptionEnum.starting_armies.
        it('Should call Math.random for the amount of armies it has to place OptionEnum.starting_armies', (): void => {
            // arange
            settings[OptionEnum.starting_armies] = '3';
            spyOn(Math, 'random').andReturn(0);

            // act
            goCommand.place_armies(commandPlaceArmiesData);

            // assert
            expect((<jasmine.Spy>Math.random).callCount).toBe(3);
        });

        // regions are part of the warmap which gets injected in the goCommand instance.
        it('Should add +1 on troopCount the region found by index of Math.random.', (): void => {
            // arange
            var index = 0;
            settings[OptionEnum.starting_armies] = '3';
            spyOn(Math, 'random').andReturn(index);

            // act
            goCommand.place_armies(commandPlaceArmiesData);

            // assert
            expect(regions[index].troopCount).toBe(1 + 3);
        });

        // Example player1 place_armies 1 1, player1 place_armies 1 1, player1 place_armies 1 1
        // We place 3 armies all on the region found by index of Math.random. Each armie will be placed induvidualy.
        it('Should return a placement for every army.', (): void => {
            // arange
            settings[OptionEnum.starting_armies] = '3';
            settings[OptionEnum.your_bot] = yourBotName;
            spyOn(Math, 'random').andReturn(0);
            var resultOneArmie: string = [yourBotName, Consts.PLACE_ARMIES, '1 1'].join(' ');

            // act
            var result: ICommandAnswer = goCommand.place_armies(commandPlaceArmiesData);

            // assert
            expect(result.value).toBe([resultOneArmie, resultOneArmie, resultOneArmie].join(', '));
        });
    });

    describe('attacktransfer', (): void => {
        // Should call it once with own false and MINIMUM_TROOPS_FOR_ATTACK and
        // once with own true and MINIMUM_TROOPS_FOR_TRANSFER.
        it('Should call getRegionsToAttackTransfer on goCommand twice', (): void => {
            // arange
            spyOn(goCommand, 'getRegionsToAttackTransfer')
                .andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number): IMoveData[]=> {
                    if (own) {
                        return [{
                            regionFrom: regions[1],
                            regionTo: regions[0]
                        }];
                    } else {
                        return [{
                            regionFrom: regions[0],
                            regionTo: regions[2]
                        }];
                    }
                });

            // act
            goCommand.attacktransfer(commandAttackTransferData);

            // assert
            expect(goCommand.getRegionsToAttackTransfer).toHaveBeenCalledWith(ownedRegions, false, Consts.MINIMUM_TROOPS_FOR_ATTACK);
            expect(goCommand.getRegionsToAttackTransfer).toHaveBeenCalledWith(ownedRegions, true, Consts.MINIMUM_TROOPS_FOR_TRANSFER);
            expect(goCommand.getRegionsToAttackTransfer.callCount).toBe(2);
        });

        // We always move all troops but 1.
        // The troopCount on the region we test on should be atleast Consts.MINIMUM_TROOPS_FOR_TRANSFER.
        // Create a spyOn for getRegionsToAttackTransfer on goCommand to control returned IMoveData and only return an arry for own=false
        // regionFrom is part of the IMove instance returned by getRegionsToAttackTransfer.
        it('Should set troopsCount to 1 on regionFrom result from getRegionsToAttackTransfer with argument own=false', (): void => {
            // arange
            regions[0].troopCount = Consts.MINIMUM_TROOPS_FOR_ATTACK;
            spyOn(goCommand, 'getRegionsToAttackTransfer')
                .andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number): IMoveData[]=> {
                    if (own) {
                        return [];
                    } else {
                        return [{
                            regionFrom: regions[0],
                            regionTo: regions[2]
                        }];
                    }
                });

            // act
            goCommand.attacktransfer(commandAttackTransferData);

            // assert
            expect(regions[0].troopCount).toBe(1);
        });

        // We always move all troops but 1.
        // The troopCount on the region we test on should be atleast Consts.MINIMUM_TROOPS_FOR_ATTACK.
        // Create a spyOn for getRegionsToAttackTransfer on goCommand to control returned IMoveData and only return an arry for own=true
        // regionFrom is part of the IMove instance returned by getRegionsToAttackTransfer.
        it('Should set troopsCount to 1 on regionFrom from getRegionsToAttackTransfer result for an attack', (): void => {
            // arange
            regions[1].troopCount = Consts.MINIMUM_TROOPS_FOR_TRANSFER;
            spyOn(goCommand, 'getRegionsToAttackTransfer')
                .andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number): IMoveData[]=> {
                    if (own) {
                        return [{
                            regionFrom: regions[1],
                            regionTo: regions[0]
                        }];
                    } else {
                        return [];
                    }
                });

            // act
            goCommand.attacktransfer(commandAttackTransferData);

            // assert
            expect(regions[1].troopCount).toBe(1);
        });

        // Example player1 attack/transfer 1 3 5, player1 attack/transfer 2 1 2
        // Create a spyOn for getRegionsToAttackTransfer on goCommand and return 
        // both a region for an attack and a region for a transfer.
        it('Should return a move for every IMoveData.', (): void => {
            // arange
            regions[0].troopCount = Consts.MINIMUM_TROOPS_FOR_ATTACK;
            regions[1].troopCount = Consts.MINIMUM_TROOPS_FOR_TRANSFER;
            spyOn(goCommand, 'getRegionsToAttackTransfer')
                .andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number): IMoveData[]=> {
                    if (own) {
                        return [{
                            regionFrom: regions[1],
                            regionTo: regions[0]
                        }];
                    } else {
                        return [{
                            regionFrom: regions[0],
                            regionTo: regions[2]
                        }];
                    }
                });

            var resultAttackRegion: string = [yourBotName,
                Consts.ATTACK_TRANSFER,
                regions[0].id.toString(),
                regions[2].id.toString(),
                (Consts.MINIMUM_TROOPS_FOR_ATTACK - 1).toString()].join(' ');
            var resultTransferRegion: string = [yourBotName,
                Consts.ATTACK_TRANSFER,
                regions[1].id.toString(),
                regions[0].id.toString(),
                (Consts.MINIMUM_TROOPS_FOR_TRANSFER - 1).toString()].join(' ');

            // act
            var result: ICommandAnswer = goCommand.attacktransfer(commandAttackTransferData);

            // assert
            expect(result.value).toBe([resultAttackRegion, resultTransferRegion].join(', '));
        });

        // Should return an empty string. 
        // Create a spyOn for getRegionsToAttackTransfer on goCommand and return not one region.
        it('should not return moves if no regions are returned by getRegionsToAttackTransfer', (): void => {
            spyOn(goCommand, 'getRegionsToAttackTransfer')
                .andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number): IMoveData[]=> {
                    if (own) {
                        return [];
                    } else {
                        return [];
                    }
                });

            // act
            var result: ICommandAnswer = goCommand.attacktransfer(commandAttackTransferData);

            // assert
            expect(result.value).toBe('');
        });
    });

    describe('getRegionsToAttackTransfer', (): void => {
        // Neigbors which are NOT owned (own paramter is false)..
        // For regions with a troopcount >= Consts.MINIMUM_TROOPS_FOR_ATTACK.
        // regions[index] in which index is determind with Math.random.
        it('Should return correct regions for attack.', (): void => {
            // arange
            regions[0].troopCount = Consts.MINIMUM_TROOPS_FOR_ATTACK;
            spyOn(Math, 'random').andReturn(0);

            // act
            var result: IMoveData[] = goCommand.getRegionsToAttackTransfer(ownedRegions, false, Consts.MINIMUM_TROOPS_FOR_ATTACK);

            // assert
            expect(result[0].regionTo).toBe(regions[2]);
            expect(result[0].regionFrom).toBe(regions[0]);
        });

        // Neigbors which are owned (own paramter is true).
        // For regions with a troopcount >= Consts.MINIMUM_TROOPS_FOR_TRANSFER.
        // regions[index] in which index is determind with Math.random.
        it('Should return correct regions for transfer.', (): void => {
            // arange
            regions[0].troopCount = Consts.MINIMUM_TROOPS_FOR_TRANSFER;
            spyOn(Math, 'random').andReturn(0);

            // act
            var result: IMoveData[] = goCommand.getRegionsToAttackTransfer(ownedRegions, true, Consts.MINIMUM_TROOPS_FOR_TRANSFER);

            // assert
            expect(result[0].regionTo).toBe(regions[1]);
            expect(result[0].regionFrom).toBe(regions[0]);
        });
    });
});
