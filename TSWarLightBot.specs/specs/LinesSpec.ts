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
    var commandMethods: ICommandMethod = {};
    var commandString: string;
    var commandData = {
        command: CommandEnum.settings,
        data: ['']
    };

    beforeEach((): void => {
        commandMethods[CommandEnum.settings] = settingMethod;
        commandString = [CommandEnum[CommandEnum.settings], OptionEnum[OptionEnum.your_bot], 'player1'].join(' ');
        lines = new Lines(commandMethods);
    });

    describe('getCommandAnswer', (): void => {
        it('Should call the right action if data command mathches.', (): void => {
            // arange
            spyOn(lines, 'getCommandData').andReturn(commandData);

            // act
            lines.getCommandAnswer(commandString);

            // assert
            expect(settingMethod).toHaveBeenCalledWith(commandData);
            expect(settingMethod.callCount).toBe(1);
        });

        it('Should return succes = false when the data string NOT matches.', (): void => {
            // arange
            commandString = 'doesnotexcist';
            spyOn(lines, 'getCommandData').andReturn({
                command: undefined,
                data: []
            });

            // act
            var result: ICommandAnswer = lines.getCommandAnswer(commandString);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandString));
        });

        it('Should return succes = false when the CommandMethod.method is null.', (): void => {
            // arange
            commandMethods[CommandEnum.settings] = null;
            spyOn(lines, 'getCommandData').andReturn(commandData);

            // act
            var result: ICommandAnswer = lines.getCommandAnswer(commandString);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandString));
        });

        it('Should return succes = false when the CommandMethod.method is undefined.', (): void => {
            // arange
            commandMethods[CommandEnum.settings] = undefined;
            spyOn(lines, 'getCommandData').andReturn(commandData);

            // act
            var result: ICommandAnswer = lines.getCommandAnswer(commandString);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandString));
        });

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
        it('Should return command if string matches', (): void => {
            // arange

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.command).toBe(CommandEnum.settings);
        });

        it('Should return command is undefined when string contains only spaces', (): void => {
            // arange

            // act
            var result: ICommandData = lines.getCommandData(' ');

            // assert
            expect(result.command).toBe(undefined);
        });

        it('Should return command is undefined when string contains an invalid command', (): void => {
            // arange

            // act
            var result: ICommandData = lines.getCommandData('doesnotexcist');

            // assert
            expect(result.command).toBe(undefined);
        });

        it('Should return option if string matches', (): void => {
            // arange

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.option).toBe(OptionEnum.your_bot);
        });

        it('Should return option if string contains a slash /', (): void => {
            // arange
            commandString = [CommandEnum.go, 'attack/transfer', '2000'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.option).toBe(OptionEnum.attacktransfer);
        });

        it('Should return option undefined if string contains only 1 linepart and should not crash', (): void => {
            // arange
            commandString = CommandEnum[CommandEnum.settings];

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.option).toBe(undefined);
        });

        it('Should return option undefined for a command which has no option', (): void => {
            // arange
            commandString = [CommandEnum[CommandEnum.update_map], '1 player1 2 2 player1 4 3 neutral 2 4 player2 5'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.option).toBe(undefined);
        });

        it('Should return the right data for a command with option', (): void => {
            // arange
            commandString = [CommandEnum[CommandEnum.setup_map], OptionEnum[OptionEnum.super_regions], '1 2 2 5'].join(' ');

            // act
            var result: ICommandData = lines.getCommandData(commandString);

            // assert
            expect(result.data).toEqual(['1', '2', '2', '5']);
        });

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