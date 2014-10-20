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
/// <reference path="../../Scripts/typings/jasmine/legacy/jasmine-1.3.d.ts" />
'use strict';

import CommandEnum = require('../../../TSWarLightBot/enum/CommandEnum');
import SubCommandEnum = require('../../../TSWarLightBot/enum/SubCommandEnum');
import ICommand = require('../../../TSWarLightBot/command/interface/ICommand');
import ISubCommandOption = require('../../../TSWarLightBot/command/interface/ISubCommandOption');
import ICommandData = require('../../../TSWarLightBot/interface/ICommandData');
import ICommandAnswer = require('../../../TSWarLightBot/interface/ICommandAnswer');
import IMoveData = require('../../../TSWarLightBot/command/interface/IMoveData');
import Consts = require('../../../TSWarLightBot/Consts');
import PossibleOwnersEnum = require('../../../TSWarLightBot/map/enum/PossibleOwnersEnum');
import IRegion = require('../../../TSWarLightBot/map/interface/IRegion');
import util = require('util');

describe('go', () => {
    var Go: any = require("../../../TSWarLightBot/command/Go");
    var go: any;
    var commandPlaceArmiesData: ICommandData = {
        line: 'go place_armies 2000',
        command: CommandEnum.go,
        subCommand: SubCommandEnum.place_armies,
        data: ['2000']
    };

    var commandAttackTransferData: ICommandData = {
        line: 'go attack/transfer 2000',
        command: CommandEnum.go,
        subCommand: SubCommandEnum.attacktransfer,
        data: ['2000']
    };

    var options: ISubCommandOption = {};
    var regions: IRegion[];
    var ownRegions: IRegion[];
    var warMap: any = jasmine.createSpyObj('warMap', ['getOwnedRegions']);
    var yourBotName: string = 'player1';

    beforeEach(() => {
        regions = createMockRegions();
        ownRegions = [];
        ownRegions.push(regions[0]);
        ownRegions.push(regions[1]);
        warMap.getOwnedRegions.andReturn(ownRegions); 
        go = new Go(options, warMap);
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
        }]

        result[0].neighbors.push(result[1]);
        result[0].neighbors.push(result[2]);
        result[0].neighbors.push(result[3]);

        // We don't need this => Connectivity is only given in one way: 'region id' < 'neighbour id'.
        // result[1].neighbors.push(result[0]);

        return result;
    }

    describe('getCommandAnswer', () => {
        it('Should call right subcommand if commandPlaceArmiesData.subCommand matches.', () => {
            // arange
            spyOn(Math, 'random').andReturn(0);
            spyOn(go, 'place_armies');

            // act
            go.getCommandAnswer(commandPlaceArmiesData);

            // assert
            expect(go.place_armies).toHaveBeenCalledWith(commandPlaceArmiesData);
            expect(go.place_armies.callCount).toBe(1);
        });

        it('Should return succes = false and a error string when commandPlaceArmiesData.subCommand not matches.', () => {
            // arange
            spyOn(Math, 'random').andReturn(0);
            commandPlaceArmiesData.subCommand = SubCommandEnum.neighbors;
            commandPlaceArmiesData.line = 'go neighbors 2000';

            // act
            var result: ICommandAnswer = go.getCommandAnswer(commandPlaceArmiesData);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandPlaceArmiesData.line));
        });

        it('Should return succes = false and a error string when commandPlaceArmiesData.subCommand is undefined.', () => {
            // arange
            spyOn(Math, 'random').andReturn(0);
            commandPlaceArmiesData.subCommand = undefined;
            commandPlaceArmiesData.line = 'go 2000';

            // act
            var result: ICommandAnswer = go.getCommandAnswer(commandPlaceArmiesData);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandPlaceArmiesData.line));
        });
    });

    describe('place_armies', () => {
        it('Should call getOwnedRegions on warMap', () => {
            // arange
            spyOn(Math, 'random').andReturn(0);

            // act
            go.place_armies(commandPlaceArmiesData);

            // assert
            expect(warMap.getOwnedRegions).toHaveBeenCalledWith(PossibleOwnersEnum.PLAYER);
            expect(warMap.getOwnedRegions.callCount).toBe(1);
        });

        it('Should call Math.random for the amount of armies it has to place', () => {
            // arange
            options[SubCommandEnum.starting_armies] = '3';
            spyOn(Math, 'random').andReturn(0);

            // act
            go.place_armies(commandPlaceArmiesData);

            // assert
            expect((<jasmine.Spy>Math.random).callCount).toBe(3);
        });

        it('Should add +1 on troopCount for each armie on region found by index of Math.random.', () => {
            // arange
            options[SubCommandEnum.starting_armies] = '3';
            spyOn(Math, 'random').andReturn(0);

            // act
            go.place_armies(commandPlaceArmiesData);

            // assert
            expect(regions[0].troopCount).toBe(1 + 3);
        });

        // Example player1 place_armies 1 1, player1 place_armies 1 1, player1 place_armies 1 1
        // We place 3 armies all on the same Region 1 by 1 (we have only 1 region and our spy on Math.random returns 0 every time).
        it('Should return a placement for every army.', () => {
            // arange
            options[SubCommandEnum.starting_armies] = '3';
            options[SubCommandEnum.your_bot] = yourBotName;
            spyOn(Math, 'random').andReturn(0);
            var resultOneArmie: string = [yourBotName, Consts.PLACE_ARMIES, '1 1'].join(' ');

            // act
            var result: ICommandAnswer = go.place_armies(commandPlaceArmiesData);

            // assert
            expect(result.value).toBe([resultOneArmie, resultOneArmie, resultOneArmie].join(', '));
        });
    });

    describe('attacktransfer', () => {
        it('Should call getRegionsToAttackTransfer on this twice', () => {
            // arange
            spyOn(go, 'getRegionsToAttackTransfer').andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number) => {
                if (own) {
                    return [{
                        moveFrom: regions[1],
                        moveTo: regions[0]
                    }];
                } else {
                    return [{
                        moveFrom: regions[0],
                        moveTo: regions[2]
                    }];
                }
            });

            // act
            go.attacktransfer(commandAttackTransferData);

            // assert
            expect(go.getRegionsToAttackTransfer).toHaveBeenCalledWith(ownRegions, false, Consts.MINIMUM_TROOPS_FOR_ATTACK);
            expect(go.getRegionsToAttackTransfer).toHaveBeenCalledWith(ownRegions, true, Consts.MINIMUM_TROOPS_FOR_TRANSFER);
            expect(go.getRegionsToAttackTransfer.callCount).toBe(2);
        });

        it('Should set troopsCount to 1 on moveFrom in each IMoveData result from getRegionsToAttackTransfer', () => {
            // arange
            regions[0].troopCount = Consts.MINIMUM_TROOPS_FOR_TRANSFER - 1;
            spyOn(go, 'getRegionsToAttackTransfer').andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number) => {
                if (own) {
                    return [];
                } else {
                    return [{
                        moveFrom: regions[0],
                        moveTo: regions[2]
                    }];
                }
            });

            // act
            go.attacktransfer(commandAttackTransferData);

            // assert
            expect(regions[0].troopCount).toBe(1);
        });

        it('Should set troopsCount to 1 on moveFrom in each IMoveData result from getRegionsToAttackTransfer', () => {
            // arange
            regions[1].troopCount = Consts.MINIMUM_TROOPS_FOR_ATTACK;
            spyOn(go, 'getRegionsToAttackTransfer').andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number) => {
                if (own) {
                    return [{
                        moveFrom: regions[1],
                        moveTo: regions[0]
                    }];
                } else {
                    return [];
                }
            });

            // act
            go.attacktransfer(commandAttackTransferData);

            // assert
            expect(regions[1].troopCount).toBe(1);
        });

        // Example player1 attack/transfer 1 3 5, player1 attack/transfer 2 1 2
        it('Should return a move for every IMoveData.', () => {
            // arange
            regions[0].troopCount = Consts.MINIMUM_TROOPS_FOR_ATTACK;
            regions[1].troopCount = Consts.MINIMUM_TROOPS_FOR_TRANSFER;
            spyOn(go, 'getRegionsToAttackTransfer').andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number) => {
                if (own) {
                    return [{
                        moveFrom: regions[1],
                        moveTo: regions[0]
                    }];
                } else {
                    return [{
                        moveFrom: regions[0],
                        moveTo: regions[2]
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
            var result: ICommandAnswer = go.attacktransfer(commandAttackTransferData);

            // assert
            expect(result.value).toBe([resultAttackRegion, resultTransferRegion].join(', '));
        });
    });

    describe('getRegionsToAttackTransfer', () => {
        // Neigbors which are NOT owned.
        // For regions with a troopcount > 6
        // regions[index] in which index is determind with Math.random.
        it('Should return correct regions from ownRegions.', () => {
            // arange
            regions[0].troopCount = Consts.MINIMUM_TROOPS_FOR_ATTACK;
            spyOn(Math, 'random').andReturn(0);

            // act
            var result: IMoveData[] = go.getRegionsToAttackTransfer(ownRegions, false, Consts.MINIMUM_TROOPS_FOR_ATTACK);

            // assert
            expect(result[0].moveTo).toBe(regions[2]);
            expect(result[0].moveFrom).toBe(regions[0]);
        });
    });
});
