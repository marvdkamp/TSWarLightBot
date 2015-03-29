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
import ICommandData = require('../../../TSWarLightBot/interface/ICommandData');
import IOptionSetting = require('../../../TSWarLightBot/command/interface/IOptionSetting');
import IRegion = require('../../../TSWarLightBot/map/interface/IRegion');
import IAnswer = require('../../../TSWarLightBot/interface/IAnswer');
import ShuffleArray = require('../../../TSWarLightBot/command/helper/ShuffleArray');
import PossibleOwnersEnum = require('../../../TSWarLightBot/map/enum/PossibleOwnersEnum');
import RegionsMock = require('./RegionsMock');

describe('updateMapCommand', (): void => {
    var UpdateMapCommand: any = require('../../../TSWarLightBot/command/UpdateMapCommand');
    var updateMapCommand: any;

    // Mocks and spies.
    var commandDataMock: ICommandData;
    var settingsMock: IOptionSetting;
    var warMapSpy: any;
    var yourBotNameMock: string;
    var opponentBotName: string;
    var regionsMock: IRegion[];

    beforeEach((): void => {
        settingsMock = {};
        yourBotNameMock = 'player1';
        opponentBotName = 'player2';
        settingsMock[OptionEnum.opponent_bot] = opponentBotName;
        settingsMock[OptionEnum.your_bot] = yourBotNameMock;
        warMapSpy = jasmine.createSpyObj('warMap', ['getRegionById']);
        regionsMock = RegionsMock.getMock();
        warMapSpy.getRegionById.andCallFake((id: number): IRegion => {
            return regionsMock[id - 1];
        });

        // Creeer de unit under test en injecteer de mock en spy.
        updateMapCommand = new UpdateMapCommand(settingsMock, warMapSpy);
    });

    describe('getAnswer', (): void => {
        beforeEach((): void => {
            commandDataMock = {
                line: 'update_map 1 player1 2 2 player1 4 3 neutral 2 4 player2 5',
                command: CommandEnum.update_map,
                option: undefined,
                data: new ShuffleArray<string>(['1', 'player1', '2', '2', 'player1', '4', '3', 'neutral', '2', '4', 'player2', '5'])
            };
        });

        // Every three items in data stand for one region to update. 
        // First item is id of the region.
        // Second item is the name of the player.
        // Third item is the troopcount on the region.
        // It should call addRegion for the amount of item in data devided by three.
        // It should call it with the id of the Region.
        it('Should call getRegionById on warMap.', (): void => {
            // arange

            // act
            updateMapCommand.getAnswer(commandDataMock);

            // assert
            expect(warMapSpy.getRegionById.callCount).toBe(4);
        });

        it('Should update the regions', (): void => {
            // arange

            // act
            updateMapCommand.getAnswer(commandDataMock);

            // assert
            expect(regionsMock[0].owner).toBe(PossibleOwnersEnum.PLAYER);
            expect(regionsMock[0].troopCount).toBe(2);
            expect(regionsMock[1].owner).toBe(PossibleOwnersEnum.PLAYER);
            expect(regionsMock[1].troopCount).toBe(4);
            expect(regionsMock[2].owner).toBe(PossibleOwnersEnum.NEUTRAL);
            expect(regionsMock[2].troopCount).toBe(2);
            expect(regionsMock[3].owner).toBe(PossibleOwnersEnum.OPPONENT);
            expect(regionsMock[3].troopCount).toBe(5);
        });

        it('Should return IAnwser.succes is true and a empty value', (): void => {
            // arrange

            // act
            var result: IAnswer = updateMapCommand.getAnswer(commandDataMock);

            // assert
            expect(result.succes).toBeTruthy();
            expect(result.value).toBe('');
        });
    });
});
