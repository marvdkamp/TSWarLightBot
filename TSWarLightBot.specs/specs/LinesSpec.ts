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
/// <reference path="../Scripts/typings/jasmine/legacy/jasmine-1.3.d.ts" />
'use strict';

import ILines = require('../../TSWarLightBot/interface/ILines');
import IAnswer = require('../../TSWarLightBot/interface/IAnswer');
import ICommandData = require('../../TSWarLightBot/interface/ICommandData');
import ICommandMethod = require('../../TSWarLightBot/interface/ICommandMethod');
import Consts = require('../../TSWarLightBot/Consts');
import util = require('util');
import CommandEnum = require('../../TSWarLightBot/enum/CommandEnum');
import OptionEnum = require('../../TSWarLightBot/enum/OptionEnum');

describe('lines', (): void => {
    // Class for unit under test.
    var Lines: any = require('../../TSWarLightBot/Lines');
    var lines: ILines;

    // Mocks and spies.
    var commandStringMock: string;

    // getCommandData zet de string die vanaf de game engine komt om naar een object met properties voor:
    // line (string). De orginele string van de engine.
    // commando (CommandEnum). De engine kent 6 verschillende commando's. Het is het eerste woord in de string.
    // option (OptionEnum). Sommige commando's kennen verschillende opties; Het is het tweede woord in de string of het ontbreekt.
    // data (string[]). Sommige commando's krijgen extra data mee. Het is het derde woord en verder in de 
    // string of het tweede als de optie ontbreekt.
    describe('getCommandData', (): void => {
        beforeEach((): void => {
            // Create an instance and pass null because we don't need the injected commandMethodList for these tests.
            lines = new Lines(null);
        });

        it('Should return ICommandData.command is undefined when string contains null', (): void => {
            // arange
            commandStringMock = null;

            // act
            var result: ICommandData = lines.getCommandData(' ');

            // assert
            expect(result.command).toBe(undefined);
        });

        it('Should return ICommandData.command is undefined when commandString contains only spaces', (): void => {
            // arange
            commandStringMock = ' ';

            // act
            var result: ICommandData = lines.getCommandData(commandStringMock);

            // assert
            expect(result.command).toBe(undefined);
        });

        it('Should return ICommandData.command is undefined when commandString contains an invalid command', (): void => {
            // arange
            commandStringMock = 'doesnotexcist';

            // act
            var result: ICommandData = lines.getCommandData(commandStringMock);

            // assert
            expect(result.command).toBe(undefined);
        });

        it('Should return ICommandData.command as CommandEnum.settings if commandString contains settings', (): void => {
            // arange
            commandStringMock = [CommandEnum[CommandEnum.settings], OptionEnum[OptionEnum.your_bot], 'player1'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandStringMock);

            // assert
            expect(result.command).toBe(CommandEnum.settings);
        });

        it('Should return ICommandData.option as OptionEnum.your_bot if commandString contains your_bot', (): void => {
            // arange
            commandStringMock = [CommandEnum[CommandEnum.settings], OptionEnum[OptionEnum.your_bot], 'player1'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandStringMock);

            // assert
            expect(result.option).toBe(OptionEnum.your_bot);
        });

        // a string with a slash is not a valid enum value so we remove the slash.
        it('Should return ICommandData.option is OptionEnum.attacktransfer if commandString contains a attack/transfer', (): void => {
            // arange
            commandStringMock = [CommandEnum.go, 'attack/transfer', '2000'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandStringMock);

            // assert
            expect(result.option).toBe(OptionEnum.attacktransfer);
        });

        // Check if it does not crash on an missing option part in the commandstring.
        it('Should return ICommandData.option undefined if commandString contains only 1 linepart', (): void => {
            // arange
            commandStringMock = CommandEnum[CommandEnum.settings];

            // act
            var result: ICommandData = lines.getCommandData(commandStringMock);

            // assert
            expect(result.option).toBe(undefined);
        });

        // update_map 1 player1 2 2 player1 4 3 neutral 2 4 player2 5.
        it('Should return ICommandData.option undefined for the update_map command which has no options', (): void => {
            // arange
            commandStringMock = [CommandEnum[CommandEnum.update_map], '1 player1 2 2 player1 4 3 neutral 2 4 player2 5'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandStringMock);

            // assert
            expect(result.option).toBe(undefined);
        });

        // setup_map super_regions 1 2 2 5.
        // Resultaat zou ['1', '2', '2', '5'] moeten zijn.
        it('Should return the right data for the CommandEnum.setup_map command with OptionEnum.super_regions.', (): void => {
            // arange
            commandStringMock = [CommandEnum[CommandEnum.setup_map], OptionEnum[OptionEnum.super_regions], '1 2 2 5'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandStringMock);

            // assert
            expect(result.data).toEqual(['1', '2', '2', '5']);
        });

        // pick_starting_regions 2000 1 7 12 13 18 15 24 25 29 37 42 41.
        // resultaat zou ['2000', '1', '7', '12', '13', '18', '15', '24', '25', '29', '37', '42', '41'] moeten zijn.
        it('Should return the right data for the CommandEnum.pick_starting_regions which has no options', (): void => {
            // arange
            commandStringMock = [CommandEnum[CommandEnum.pick_starting_regions], '2000 1 7 12 13 18 15 24 25 29 37 42 41'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandStringMock);

            // assert
            expect(result.data).toEqual(['2000', '1', '7', '12', '13', '18', '15', '24', '25', '29', '37', '42', '41']);
        });
    });

    // De game engine kent 6 verschillende commando's. De propery command in CommandData is een enum die deze commando's vertegenwoordigd.
    // De Commandata wordt opgehaald met een aanroep naar getCommandData. De applicatie heeft per commando een class in de map commando. 
    // Deze command classes implemeteren allemaal ICommand met de method getAnswer. De Lines class die we hier testen zorgt dat op de 
    // juiste  class instantie van de command classes de method getAnswer wordt aangeroepen. Er wordt een lijst met de methodes die 
    // aangroepen kunnen  worden geinjecteerd bij het instantiëren van Lines. Deze lijst is een "dictionary" die een CommandEnum aan een 
    // methode koppelt. Er is een Mock voor deze lijst geschreven en die wordt in de beforeeach geinjecteerd in de Lines instantie die we 
    // hier testen.
    describe('getAnswer', (): void => {
        // Mocks and spies.
        var settingMethodSpy: any;
        var commandMethodListMock: ICommandMethod;
        var commandDataMock: ICommandData;

        beforeEach((): void => {
            // Creeer de commandMethodList mock die we voor de meeste tests nodig hebben en een overeenkomstige commandString. 
            // Zonodig kunnen deze in een it overschreven worden. Doe dit voor de aanroep van getAnswer.
            settingMethodSpy = jasmine.createSpy('settingMethod');
            commandMethodListMock = {};
            commandMethodListMock[CommandEnum.settings] = settingMethodSpy;
            commandStringMock = [CommandEnum[CommandEnum.settings], OptionEnum[OptionEnum.your_bot], 'player1'].join(' ');

            // Creer de commandData mock die we voor de meeste tests nodig hebben.
            // Zonodig kan deze in een it overschreven worden voor de aanroep van getAnswer.
            commandDataMock = { line: commandStringMock, command: CommandEnum.settings, data: ['player1'] };

            lines = new Lines(commandMethodListMock);
        });

        // Er is een mock voor de commandData geschreven. Creeer een SpyOn voor getCommandData die deze data retourneerd. Op die manier hou 
        // je controle over de data die getCommandData retourneerd en kun je makkelijker testen. Ook scheid je ze het testen van getAnwer 
        // en getCommandData op deze wijze.
        // Controleer of getCommandData maar 1 keer wordt aangeroepen.
        // Controleer of getCommandData wordt aangeroepen met de commandString waarmee je getAnswer aanroept.
        it('Should call getCommandData on lines.', (): void => {
            // arange
            spyOn(lines, 'getCommandData').andReturn(commandDataMock);

            // act
            lines.getAnswer(commandStringMock);

            // assert
            expect(lines.getCommandData).toHaveBeenCalledWith(commandStringMock);
            expect((<jasmine.Spy>lines.getCommandData).calls.length).toEqual(1);
        });

        // Creeer een spy voor de getCommandData method op the lines instance.
        // Controlleer of de commandData doorgegeven wordt aan de methode die aangeroepen wordt.
        // Controlleer of het commando maar 1 keer wordt aangeroepen.
        it('Should call the command in commandData.command.', (): void => {
            // arange
            spyOn(lines, 'getCommandData').andReturn(commandDataMock);

            // act
            lines.getAnswer(commandStringMock);

            // assert
            expect(settingMethodSpy).toHaveBeenCalledWith(commandDataMock);
            expect(settingMethodSpy.callCount).toBe(1);
        });

        // Controleer ook of de IAnswer.value Consts.UNABLE_TO_EXECUTE is.
        it('Should return IAnswer.succes = false when commandData.command is undefined.', (): void => {
            // arange
            commandStringMock = 'doesnotexcist';
            commandDataMock = { line: commandStringMock, command: undefined, data: [] };
            spyOn(lines, 'getCommandData').andReturn(commandDataMock);

            // act
            var result: IAnswer = lines.getAnswer(commandStringMock);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandStringMock));
        });

        it('Should return IAnswer.succes = false when the commandMethodList method is null.', (): void => {
            // arange
            commandMethodListMock[CommandEnum.settings] = null;
            spyOn(lines, 'getCommandData').andReturn(commandDataMock);

            // act
            var result: IAnswer = lines.getAnswer(commandStringMock);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandStringMock));
        });

        it('Should return IAnswer.succes = false when the commandMethodList method is undefined.', (): void => {
            // arange
            commandMethodListMock[CommandEnum.settings] = undefined;
            spyOn(lines, 'getCommandData').andReturn(commandDataMock);

            // act
            var result: IAnswer = lines.getAnswer(commandStringMock);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandStringMock));
        });
    });
});