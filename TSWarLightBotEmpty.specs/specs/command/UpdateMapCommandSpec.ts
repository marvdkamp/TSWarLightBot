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

import CommandEnum = require('../../../TSWarLightBotEmpty/enum/CommandEnum');
import OptionEnum = require('../../../TSWarLightBotEmpty/enum/OptionEnum');
import ICommandData = require('../../../TSWarLightBotEmpty/interface/ICommandData');
import IOptionSetting = require('../../../TSWarLightBotEmpty/command/interface/IOptionSetting');
import IRegion = require('../../../TSWarLightBotEmpty/map/interface/IRegion');
import ShuffleArray = require('../../../TSWarLightBotEmpty/command/helper/ShuffleArray');
import PossibleOwnersEnum = require('../../../TSWarLightBotEmpty/map/enum/PossibleOwnersEnum');
import RegionsMock = require('./RegionsMock');

describe('updateMapCommand', (): void => {
    var UpdateMapCommand: any = require('../../../TSWarLightBotEmpty/command/UpdateMapCommand');
    var updateMapCommand: any;

    // Mocks and spies.
    var commandDataMock: ICommandData;
    var settingsMock: IOptionSetting;
    var warMapSpy: any;
    var yourBotNameMock: string;
    var opponentBotName: string;
    var regionsMock: IRegion[];

    beforeEach((): void => {
    });

    describe('getAnswer', (): void => {

        // Every three items in data stand for one region to update. 
        // First item is id of the region.
        // Second item is the name of the player.
        // Third item is the troopcount on the region.
        // It should call addRegion for the amount of item in data devided by three.
        // It should call it with the id of the Region.
        it('Should call getRegionById on warMap.', (): void => {
            // arange

            // act

            // assert
        });

        it('Should update the regions', (): void => {
            // arange

            // act

            // assert
        });

        it('Should return IAnwser.succes is true and a empty value', (): void => {
            // arrange

            // act

            // assert
        });
    });
});
