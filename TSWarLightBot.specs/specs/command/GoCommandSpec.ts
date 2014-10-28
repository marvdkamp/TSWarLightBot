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
import IAnswer = require('../../../TSWarLightBot/interface/IAnswer');
import IMoveData = require('../../../TSWarLightBot/command/interface/IMoveData');
import Consts = require('../../../TSWarLightBot/Consts');
import PossibleOwnersEnum = require('../../../TSWarLightBot/map/enum/PossibleOwnersEnum');
import IRegion = require('../../../TSWarLightBot/map/interface/IRegion');
import RegionsMock = require('./RegionsMock');
import util = require('util');
import ShuffleArray = require('../../../TSWarLightBot/command/helper/ShuffleArray');

describe('goCommand', (): void => {
    // Class for unit under test and variable for instance of unit under test.
    var GoCommand: any = require('../../../TSWarLightBot/command/GoCommand');
    var goCommand: any;

    // Mocks and spies.
    var commandDataMock: ICommandData;
    var settingsMock: IOptionSetting;
    var regionsMock: IRegion[];
    var ownedRegionsMock: IRegion[];
    var yourBotNameMock: string;
    var warMapSpy: any;

    beforeEach((): void => {
       // Creeer de settings mock die we voor de meeste tests nodig hebben. 
       // Zonodig kan deze in een it overschreven worden. Doe dit voor de aanroep van getAnswer, place_armies of attacktransfer.
        settingsMock = {};
        yourBotNameMock = 'player1';
        settingsMock[OptionEnum.starting_armies] = '3';
        settingsMock[OptionEnum.your_bot] = yourBotNameMock;

        // Creeer de warmap spy die we voor de meeste test nodig hebben en bijbehorende regions zodat we een call naar
        // getOwnedRegions ook een return waarde kunnen geven met mock data.
        regionsMock = RegionsMock.getMock();
        ownedRegionsMock = [];
        ownedRegionsMock.push(regionsMock[0]);
        ownedRegionsMock.push(regionsMock[1]);
        warMapSpy = jasmine.createSpyObj('warMap', ['getOwnedRegions']);
        warMapSpy.getOwnedRegions.andReturn(ownedRegionsMock);

        // Creeer de unit under test en injecteer de mock en spy.
        goCommand = new GoCommand(settingsMock, warMapSpy);
    });

    // getAnswer formuleert een antwoord op een commando van de game engine. Hij retourneerd daarvoor een IAnswer instantie. Die twee
    // properties bevat:
    // succes: Een boolean of de bot succesvol een antwoord heeft kunnen formuleren.
    // value: De string waarde die terug gestuurd moet worden naar engine of een foutmelding als succes false is.
    describe('getAnswer', (): void => {
        beforeEach((): void => {
            commandDataMock = {
                line: 'go place_armies 2000',
                command: CommandEnum.go,
                option: OptionEnum.place_armies,
                data: new ShuffleArray<string>(['2000'])
            };
        });

        it('Should call place_armies method on goCommand if ICommandData.option is place_armies.', (): void => {
            // arange
            spyOn(goCommand, 'place_armies');

            // act
            goCommand.getAnswer(commandDataMock);

            // assert
            expect(goCommand.place_armies).toHaveBeenCalledWith(commandDataMock);
            expect(goCommand.place_armies.callCount).toBe(1);
        });

        it('Should call attacktransfer method on goCommand if ICommandData.option is attacktransfer.', (): void => {
            // arange
            commandDataMock = {
                line: 'go attack/transfer 2000',
                command: CommandEnum.go,
                option: OptionEnum.attacktransfer,
                data: new ShuffleArray<string>(['2000'])
            };
            spyOn(goCommand, 'attacktransfer');

            // act
            goCommand.getAnswer(commandDataMock);

            // assert
            expect(goCommand.attacktransfer).toHaveBeenCalledWith(commandDataMock);
            expect(goCommand.attacktransfer.callCount).toBe(1);
        });

        // error string should be filled too.
        it('Should return Answer.succes = false in Answer.value if ICommandData.option not matches any option in goCommand.', (): void => {
            // arange
            commandDataMock.option = OptionEnum.neighbors;
            commandDataMock.line = 'go neighbors 2000';

            // act
            var result: IAnswer = goCommand.getAnswer(commandDataMock);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandDataMock.line));
        });

        // error string should be filled too.
        it('Should return Answer.succes = false in Answer.value if ICommandData.option is undefined.', (): void => {
            // arange
            commandDataMock.option = undefined;
            commandDataMock.line = 'go 2000';

            // act
            var result: IAnswer = goCommand.getAnswer(commandDataMock);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandDataMock.line));
        });

        // error string should be filled too.
        it('Should return Answer.succes = false in Answer.value if ICommandData.option is null.', (): void => {
            // arange
            commandDataMock.option = null;
            commandDataMock.line = 'go 2000';

            // act
            var result: IAnswer = goCommand.getAnswer(commandDataMock);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandDataMock.line));
        });
    });

    // Het go command kent verschillende opties waaronder deze place_armies. Met place_armies geeft de bot aan de engine door op welke
    // regions de bot nieuwe troepen wil plaatsen. De bot ontvangt elke ronden een bepaalde hoeveelheid troepen.
    describe('place_armies', (): void => {
        beforeEach((): void => {
            commandDataMock = {
                line: 'go place_armies 2000',
                command: CommandEnum.go,
                option: OptionEnum.place_armies,
                data: new ShuffleArray<string>(['2000'])
            };
        });

        // Should call getOwnedRegions only once and with PossibleOwnersEnum.PLAYER.
        it('Should call getOwnedRegions on warMap', (): void => {
            // arange
            spyOn(Math, 'random').andReturn(0);

            // act
            goCommand.place_armies(commandDataMock);

            // assert
            expect(warMapSpy.getOwnedRegions).toHaveBeenCalledWith(PossibleOwnersEnum.PLAYER);
            expect(warMapSpy.getOwnedRegions.callCount).toBe(1);
        });

        // settings gets injected and holds OptionEnum.starting_armies.
        it('Should call Math.random for the amount of armies it has to place OptionEnum.starting_armies', (): void => {
            // arange
            spyOn(Math, 'random').andReturn(0);

            // act
            goCommand.place_armies(commandDataMock);

            // assert
            expect((<jasmine.Spy>Math.random).callCount).toBe(3);
        });

        // regions are part of the warmap which gets injected in the goCommand instance.
        it('Should add +1 on troopCount the region found by index of Math.random.', (): void => {
            // arange
            var index = 0;
            spyOn(Math, 'random').andReturn(index);

            // act
            goCommand.place_armies(commandDataMock);

            // assert
            expect(regionsMock[index].troopCount).toBe(1 + 3);
        });

        // Example player1 place_armies 1 1, player1 place_armies 1 1, player1 place_armies 1 1
        // We place 3 armies all on the region found by index of Math.random. Each armie will be placed induvidualy.
        it('Should return a placement for every army.', (): void => {
            // arange
            spyOn(Math, 'random').andReturn(0);
            var resultOneArmie: string = [yourBotNameMock, Consts.PLACE_ARMIES, '1 1'].join(' ');

            // act
            var result: IAnswer = goCommand.place_armies(commandDataMock);

            // assert
            expect(result.value).toBe([resultOneArmie, resultOneArmie, resultOneArmie].join(', '));
        });
    });

    // Het go command kent verschillende opties waaronder deze attacktransfer. Met attacktransfer geeft de bot aan de engine door 
    // welke troepen de bot wil verplaatsen van eigen regions en welke vijandelijk regions hij wil aanvallen en met hoeveel troepen.
    describe('attacktransfer', (): void => {
        beforeEach((): void => {
            commandDataMock = {
                line: 'go attack/transfer 2000',
                command: CommandEnum.go,
                option: OptionEnum.attacktransfer,
                data: new ShuffleArray<string>(['2000'])
            };
        });

        // Should call getRegionsToAttackTransfer once with own false and MINIMUM_TROOPS_FOR_ATTACK and
        // once with own true and MINIMUM_TROOPS_FOR_TRANSFER.
        it('Should call getRegionsToAttackTransfer on goCommand twice', (): void => {
            // arange
            spyOn(goCommand, 'getRegionsToAttackTransfer')
                .andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number): IMoveData[]=> {
                    if (own) {
                        return [{
                            regionFrom: regionsMock[1],
                            regionTo: regionsMock[0]
                        }];
                    } else {
                        return [{
                            regionFrom: regionsMock[0],
                            regionTo: regionsMock[2]
                        }];
                    }
                });

            // act
            goCommand.attacktransfer(commandDataMock);

            // assert
            expect(goCommand.getRegionsToAttackTransfer).toHaveBeenCalledWith(ownedRegionsMock, false, Consts.MINIMUM_TROOPS_FOR_ATTACK);
            expect(goCommand.getRegionsToAttackTransfer).toHaveBeenCalledWith(ownedRegionsMock, true, Consts.MINIMUM_TROOPS_FOR_TRANSFER);
            expect(goCommand.getRegionsToAttackTransfer.callCount).toBe(2);
        });

        // We always move all troops but 1.
        // The troopCount on the region we test on should be atleast Consts.MINIMUM_TROOPS_FOR_TRANSFER.
        // Create a spyOn for getRegionsToAttackTransfer on goCommand to control returned IMoveData and only return an arry for own=false
        // regionFrom is part of the IMove instance returned by getRegionsToAttackTransfer.
        it('Should set troopsCount to 1 on regionFrom result from getRegionsToAttackTransfer with argument own=false', (): void => {
            // arange
            regionsMock[0].troopCount = Consts.MINIMUM_TROOPS_FOR_ATTACK;
            spyOn(goCommand, 'getRegionsToAttackTransfer')
                .andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number): IMoveData[]=> {
                    if (own) {
                        return [];
                    } else {
                        return [{
                            regionFrom: regionsMock[0],
                            regionTo: regionsMock[2]
                        }];
                    }
                });

            // act
            goCommand.attacktransfer(commandDataMock);

            // assert
            expect(regionsMock[0].troopCount).toBe(1);
        });

        // We always move all troops but 1.
        // The troopCount on the region we test on should be atleast Consts.MINIMUM_TROOPS_FOR_ATTACK.
        // Create a spyOn for getRegionsToAttackTransfer on goCommand to control returned IMoveData and only return an arry for own=true
        // regionFrom is part of the IMove instance returned by getRegionsToAttackTransfer.
        it('Should set troopsCount to 1 on regionFrom from getRegionsToAttackTransfer result for an attack', (): void => {
            // arange
            regionsMock[1].troopCount = Consts.MINIMUM_TROOPS_FOR_TRANSFER;
            spyOn(goCommand, 'getRegionsToAttackTransfer')
                .andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number): IMoveData[]=> {
                    if (own) {
                        return [{
                            regionFrom: regionsMock[1],
                            regionTo: regionsMock[0]
                        }];
                    } else {
                        return [];
                    }
                });

            // act
            goCommand.attacktransfer(commandDataMock);

            // assert
            expect(regionsMock[1].troopCount).toBe(1);
        });

        // Example player1 attack/transfer 1 3 5, player1 attack/transfer 2 1 2
        // Create a spyOn for getRegionsToAttackTransfer on goCommand and return 
        // both a region for an attack and a region for a transfer.
        it('Should return a move for every IMoveData.', (): void => {
            // arange
            regionsMock[0].troopCount = Consts.MINIMUM_TROOPS_FOR_ATTACK;
            regionsMock[1].troopCount = Consts.MINIMUM_TROOPS_FOR_TRANSFER;
            spyOn(goCommand, 'getRegionsToAttackTransfer')
                .andCallFake((ownedRegions: IRegion[], own: boolean, numberOfTroops: number): IMoveData[]=> {
                    if (own) {
                        return [{
                            regionFrom: regionsMock[1],
                            regionTo: regionsMock[0]
                        }];
                    } else {
                        return [{
                            regionFrom: regionsMock[0],
                            regionTo: regionsMock[2]
                        }];
                    }
                });

            var resultAttackRegion: string = [yourBotNameMock,
                Consts.ATTACK_TRANSFER,
                regionsMock[0].id.toString(),
                regionsMock[2].id.toString(),
                (Consts.MINIMUM_TROOPS_FOR_ATTACK - 1).toString()].join(' ');
            var resultTransferRegion: string = [yourBotNameMock,
                Consts.ATTACK_TRANSFER,
                regionsMock[1].id.toString(),
                regionsMock[0].id.toString(),
                (Consts.MINIMUM_TROOPS_FOR_TRANSFER - 1).toString()].join(' ');

            // act
            var result: IAnswer = goCommand.attacktransfer(commandDataMock);

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
            var result: IAnswer = goCommand.attacktransfer(commandDataMock);

            // assert
            expect(result.value).toBe(Consts.NO_MOVES);
        });
    });

    describe('getRegionsToAttackTransfer', (): void => {
        // Neigbors which are NOT owned (own paramter is false)..
        // For regions with a troopcount >= Consts.MINIMUM_TROOPS_FOR_ATTACK.
        // regions[index] in which index is determind with Math.random.
        it('Should return correct regions for attack.', (): void => {
            // arange
            regionsMock[0].troopCount = Consts.MINIMUM_TROOPS_FOR_ATTACK;
            spyOn(Math, 'random').andReturn(0);

            // act
            var result: IMoveData[] = goCommand.getRegionsToAttackTransfer(ownedRegionsMock, false, Consts.MINIMUM_TROOPS_FOR_ATTACK);

            // assert
            expect(result[0].regionTo).toBe(regionsMock[2]);
            expect(result[0].regionFrom).toBe(regionsMock[0]);
        });

        // Neigbors which are owned (own paramter is true).
        // For regions with a troopcount >= Consts.MINIMUM_TROOPS_FOR_TRANSFER.
        // regions[index] in which index is determind with Math.random.
        it('Should return correct regions for transfer.', (): void => {
            // arange
            regionsMock[0].troopCount = Consts.MINIMUM_TROOPS_FOR_TRANSFER;
            spyOn(Math, 'random').andReturn(0);

            // act
            var result: IMoveData[] = goCommand.getRegionsToAttackTransfer(ownedRegionsMock, true, Consts.MINIMUM_TROOPS_FOR_TRANSFER);

            // assert
            expect(result[0].regionTo).toBe(regionsMock[1]);
            expect(result[0].regionFrom).toBe(regionsMock[0]);
        });
    });
});
