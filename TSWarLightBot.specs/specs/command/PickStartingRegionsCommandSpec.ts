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
import ICommandData = require('../../../TSWarLightBot/interface/ICommandData');
import IAnswer = require('../../../TSWarLightBot/interface/IAnswer');
import Consts = require('../../../TSWarLightBot/Consts');
import ShuffleArray = require('../../../TSWarLightBot/command/helper/ShuffleArray');
import util = require('util');

describe('pickStartingRegionsCommand', (): void => {
    // Class for unit under test and variable for instance of unit under test.
    var PickStartingRegionsCommand: any = require('../../../TSWarLightBot/command/PickStartingRegionsCommand');
    var pickStartingRegionsCommand: any;

    // mocks and spies.
    var commandDataMock: ICommandData;

    // getAnswer formuleert een antwoord op een commando van de game engine. Hij retourneerd daarvoor een IAnswer instantie. Die twee
    // properties bevat:
    // succes: Een boolean of de bot succesvol een antwoord heeft kunnen formuleren.
    // value: De string waarde die terug gestuurd moet worden naar engine of een foutmelding als succes false is.
    describe('getAnswer', (): void => {
        beforeEach((): void => {
            commandDataMock = {
                line: 'pick_starting_regions 2000 1 7 12 13 18 15 24 25 29 37 42 41',
                command: CommandEnum.pick_starting_regions,
                option: null,
                data: new ShuffleArray<string>(['2000', '1', '7', '12', '13', '18', '15', '24', '25', '29', '37', '42', '41'])
            };
            pickStartingRegionsCommand = new PickStartingRegionsCommand();
        });

        // Should get the first item from the data because thats the alloted time.
        it('Should call shift on commandData.data.', (): void => {
            // arange
            spyOn(commandDataMock.data, 'shift');

            // act
            pickStartingRegionsCommand.getAnswer(commandDataMock);

            // assert
            expect((<jasmine.Spy>commandDataMock.data.shift).callCount).toBe(1);
        });

        it('Should call shuffle on commandData.data but not before first item is removed', (): void => {
            // arange
            spyOn(commandDataMock.data, 'shuffle').andCallFake((): void => {
                // assert
                expect(commandDataMock.data[0]).not.toBe('2000');
            });

            // act
            pickStartingRegionsCommand.getAnswer(commandDataMock);
        });

        // Test ook dat succes is true op het resultaat.
        it('Should return the first NUMBER_OF_REGIONS_TO_PICK from the Regions returned from shuffle', (): void => {
            // arange 
            // We simply don't really shuffle :). Shuffeling will be tested elsewhere.
            spyOn(commandDataMock.data, 'shuffle').andReturn(commandDataMock.data);

            // act
            var result: IAnswer = pickStartingRegionsCommand.getAnswer(commandDataMock);

            // assert
            expect(result.value).toBe('1 7 12 13 18 15');
            expect(result.succes).toBe(true);
        });

        // Test ook dat value is NOT_ENOUGHT_REGIONS from Consts.
        it('Should return result.succes is false if there is not enough data', (): void => {
            // arange 
            commandDataMock.line = 'pick_starting_regions 2000 1 7 12 13 18';
            commandDataMock.data = new ShuffleArray<string>(['2000', '1', '7', '12', '13', '18']);

            // act
            var result: IAnswer = pickStartingRegionsCommand.getAnswer(commandDataMock);

            // assert
            expect(result.succes).toBe(false);
            expect(result.value).toBe(util.format(Consts.NOT_ENOUGHT_REGIONS, commandDataMock.line));
        });
    });
});
