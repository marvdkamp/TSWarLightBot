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
import ICommandData = require('../../../TSWarLightBotEmpty/interface/ICommandData');
import IAnswer = require('../../../TSWarLightBotEmpty/interface/IAnswer');
import Consts = require('../../../TSWarLightBotEmpty/Consts');
import ShuffleArray = require('../../../TSWarLightBotEmpty/command/helper/ShuffleArray');
import util = require('util');

describe('pickStartingRegionsCommand', (): void => {
    // Class for unit under test and variable for instance of unit under test.
    var PickStartingRegionsCommand: any = require('../../../TSWarLightBotEmpty/command/PickStartingRegionsCommand');
    var pickStartingRegionsCommand: any;

    // mocks and spies.
    var commandDataMock: ICommandData;

    // getAnswer formuleert een antwoord op een commando van de game engine. Hij retourneerd daarvoor een IAnswer instantie. Die twee
    // properties bevat:
    // succes: Een boolean of de bot succesvol een antwoord heeft kunnen formuleren.
    // value: De string waarde die terug gestuurd moet worden naar engine of een foutmelding als succes false is.
    describe('getAnswer', (): void => {
        beforeEach((): void => {
        });

        // Should get the first item from the data because thats the alloted time.
        it('Should call shift on commandData.data.', (): void => {
            // arange

            // act

            // assert
        });

        it('Should call shuffle on commandData.data but not before first item is removed', (): void => {
            // arange

            // act

            // assert
        });

        // Test ook dat succes is true op het resultaat.
        it('Should return the first NUMBER_OF_REGIONS_TO_PICK from the Regions returned from shuffle', (): void => {
            // arange 

            // act

            // assert
        });

        // Test ook dat value is NOT_ENOUGHT_REGIONS from Consts.
        it('Should return result.succes is false if there is not enough data', (): void => {
            // arange 

            // act

            // assert
        });
    });
});
