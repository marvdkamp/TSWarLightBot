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
import Consts = require('../../../TSWarLightBot/Consts');
import ShuffleArray = require('../../../TSWarLightBot/command/helper/ShuffleArray');

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
            var data: ShuffleArray<string> = new ShuffleArray<string>();
            ['2000', '1', '7', '12', '13', '18', '15', '24', '25', '29', '37', '42', '41'].forEach((value: string) => {
                data.push(value);
            });

            commandDataMock = {
                line: 'pick_starting_regions place_armies 2000 1 7 12 13 18 15 24 25 29 37 42 41',
                command: CommandEnum.pick_starting_regions,
                option: null,
                data: data
            };
            pickStartingRegionsCommand = new PickStartingRegionsCommand();
        });

        it('Should call Math.random for the amount of regions it must pick.', (): void => {
            // arange

            // act
            pickStartingRegionsCommand.getAnswer(commandDataMock);

            // assert
            expect((<jasmine.Spy>Math.random).callCount).toBe(Consts.NUMBER_OF_REGIONS_TO_PICK);
        });
    });
});
