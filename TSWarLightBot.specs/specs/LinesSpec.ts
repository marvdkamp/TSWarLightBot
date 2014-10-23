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
import ICommandAnswer = require('../../TSWarLightBot/interface/ICommandAnswer');
import ICommandData = require('../../TSWarLightBot/interface/ICommandData');
import ICommandMethod = require('../../TSWarLightBot/interface/ICommandMethod');
import Consts = require('../../TSWarLightBot/Consts');
import util = require('util');
import CommandEnum = require('../../TSWarLightBot/enum/CommandEnum');
import OptionEnum = require('../../TSWarLightBot/enum/OptionEnum');

describe('lines', (): void => {
    var Lines: any = require('../../TSWarLightBot/Lines');
    var lines: ILines;
    var settingMethod: any = jasmine.createSpy('settingMethod');
    var commandMethodList: ICommandMethod = {};
    var commandString: string;
    var commandData: ICommandData;

    beforeEach((): void => {
        commandMethodList[CommandEnum.settings] = settingMethod;
        commandString = [CommandEnum[CommandEnum.settings], OptionEnum[OptionEnum.your_bot], 'player1'].join(' ');
        commandData = { line: commandString, command: CommandEnum.settings, data: [''] };
        lines = new Lines(commandMethodList);
    });

    describe('getCommandAnswer', (): void => {
        // Mock the commandData and create a SpyOn for getCommandData.
        // Check ik commandData is passed to the command.
        // command should be called once.
        // commandMethodList which couples the command method to the commandEnum gets inject in the Lines instance.
        it('Should call the command in commandData.command.', (): void => {
            // arange
            spyOn(lines, 'getCommandData').andReturn(commandData);

            // act
            lines.getCommandAnswer(commandString);

            // assert
            expect(settingMethod).toHaveBeenCalledWith(commandData);
            expect(settingMethod.callCount).toBe(1);
        });

        // Mock the commandData and create a SpyOn for getCommandData.
        // commandMethodList which couples the command method to the commandEnum gets inject in the Lines instance.
        it('Should return succes = false when commandData.command is undefined.', (): void => {
            // arange
            commandString = 'doesnotexcist';
            commandData = { line: commandString, command: undefined, data: [] };
            spyOn(lines, 'getCommandData').andReturn(commandData);

            // act
            var result: ICommandAnswer = lines.getCommandAnswer(commandString);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandString));
        });

        // Mock the commandData and create a SpyOn for getCommandData.
        // commandMethodList which couples the command method to the commandEnum gets inject in the Lines instance.
        it('Should return succes = false when the commandMethodList method is null.', (): void => {
            // arange
            commandMethodList[CommandEnum.settings] = null;
            spyOn(lines, 'getCommandData').andReturn(commandData);

            // act
            var result: ICommandAnswer = lines.getCommandAnswer(commandString);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandString));
        });

        // Mock the commandData and create a SpyOn for getCommandData.
        // commandMethodList which couples the command method to the commandEnum gets inject in the Lines instance.
        it('Should return succes = false when the commandMethodList method is undefined.', (): void => {
            // arange
            commandMethodList[CommandEnum.settings] = undefined;
            spyOn(lines, 'getCommandData').andReturn(commandData);

            // act
            var result: ICommandAnswer = lines.getCommandAnswer(commandString);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandString));
        });

        // Mock the commandData and create a SpyOn for getCommandData.
        // commandMethodList which couples the command method to the commandEnum gets inject in the Lines instance.
        it('Should call getCommandData on lines.', (): void => {
            // arange
            spyOn(lines, 'getCommandData').andReturn(commandData);

            // act
            lines.getCommandAnswer(commandString);

            // assert
            expect(lines.getCommandData).toHaveBeenCalledWith(commandString);
            expect((<jasmine.Spy>lines.getCommandData).calls.length).toEqual(1);
        });
    });

    describe('getCommandData', (): void => {
        it('Should return ICommandData.command is a CommandEnum if commandString matches', (): void => {
            // arange

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.command).toBe(CommandEnum.settings);
        });

        it('Should return ICommandData.command is undefined when string contains only spaces', (): void => {
            // arange

            // act
            var result: ICommandData = lines.getCommandData(' ');

            // assert
            expect(result.command).toBe(undefined);
        });

        it('Should return ICommandData.command is undefined when string contains an invalid command', (): void => {
            // arange

            // act
            var result: ICommandData = lines.getCommandData('doesnotexcist');

            // assert
            expect(result.command).toBe(undefined);
        });

        it('Should return ICommandData.option is a OptionEnum if string matches', (): void => {
            // arange

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.option).toBe(OptionEnum.your_bot);
        });

        // a string with a slash is not a valid enum value so we remove the slash.
        it('Should return ICommandData.option is OptionEnum.attacktransfer if string contains a attack/transfer', (): void => {
            // arange
            commandString = [CommandEnum.go, 'attack/transfer', '2000'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.option).toBe(OptionEnum.attacktransfer);
        });

        // Check if it does not crash on an missing option part in the commandstring.
        it('Should return ICommandData.option undefined if string contains only 1 linepart', (): void => {
            // arange
            commandString = CommandEnum[CommandEnum.settings];

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.option).toBe(undefined);
        });

        // Example : the update_map command has no option only data.
        // update_map 1 player1 2 2 player1 4 3 neutral 2 4 player2 5.
        it('Should return ICommandData.option undefined for a command which has no option', (): void => {
            // arange
            commandString = [CommandEnum[CommandEnum.update_map], '1 player1 2 2 player1 4 3 neutral 2 4 player2 5'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.option).toBe(undefined);
        });

        // Example : the setup_map command has an option super_regions and data.
        // setup_map super_regions 1 2 2 5.
        it('Should return the right data for a command with option', (): void => {
            // arange
            commandString = [CommandEnum[CommandEnum.setup_map], OptionEnum[OptionEnum.super_regions], '1 2 2 5'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.data).toEqual(['1', '2', '2', '5']);
        });

        // Example : the pick_starting_regions command has no option only data.
        // pick_starting_regions 2000 1 7 12 13 18 15 24 25 29 37 42 41.
        it('Should return the right data for a command which has no option', (): void => {
            // arange
            commandString = [CommandEnum[CommandEnum.pick_starting_regions], '2000 1 7 12 13 18 15 24 25 29 37 42 41'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.data).toEqual(['2000', '1', '7', '12', '13', '18', '15', '24', '25', '29', '37', '42', '41']);
        });
    });
});