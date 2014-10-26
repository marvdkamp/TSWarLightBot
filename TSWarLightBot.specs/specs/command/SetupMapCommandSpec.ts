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
import ICommandData = require('../../../TSWarLightBot/interface/ICommandData');

describe('setupMapCommand', (): void => {
    // Class for unit under test and variable for instance of unit under test.
    var SetupMapCommand: any = require('../../../TSWarLightBot/command/SetupMapCommand');
    var setupMapCommand: any;

    // Mocks and spies.
    var commandDataMock: ICommandData;
    var warMapSpy: any;

    beforeEach((): void => {
        // Creeer de unit under test en injecteer de mock en spy.
        setupMapCommand = new SetupMapCommand(warMapSpy);
    });

    describe('getAnswer', (): void => {
    });
});
