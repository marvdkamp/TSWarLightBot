/**
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

import ILines = require('../../TSWarLightBot/ILines');
import ICommandAnswer = require('../../TSWarLightBot/ICommandAnswer');
import ICommandMethod = require('../../TSWarLightBot/ICommandMethod');
import ICommandData = require('../../TSWarLightBot/ICommandData');
import Messages = require('../../TSWarLightBot/Messages');
import util = require('util');
import CommandEnum = require('../../TSWarLightBot/CommandEnum');
import SubCommandEnum = require('../../TSWarLightBot/SubCommandEnum');

describe('lines.test', () => {
    var Lines: any = require("../../TSWarLightBot/Lines");
    var lines: ILines;
    var settingCommandMethod: any = jasmine.createSpy('settingCommandMethod');
    var commandString: string;
    var commandData = {
        command: CommandEnum.settings,
        data: ['']
    };
    var settingCommandMethod: any = jasmine.createSpy('settingCommandMethod');

    beforeEach(() => {
        settingCommandMethod.command = CommandEnum.settings;
        settingCommandMethod.method = settingCommandMethod;
        commandString = [CommandEnum[CommandEnum.settings], SubCommandEnum[SubCommandEnum.your_bot], 'player1'].join(' ');
        lines = new Lines([settingCommandMethod]);
    });

    it('getCommandAnswer should call the right action if data command mathches.', () => {
        // arange
        spyOn(lines, 'getCommandData').andReturn(commandData);

        // act
        lines.getCommandAnswer(commandString);

        // assert
        expect(settingCommandMethod).toHaveBeenCalled();
    });

    it('getCommandAnswer should return succes = false when the data string NOT matches.', () => {
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
        expect(result.value).toBe(util.format(Messages.UNABLE_TO_EXECUTE, commandString));
    });

    it('getCommandAnswer should return succes = false when the CommandMethod.method is null.', () => {
        // arange
        settingCommandMethod.method = null;
        spyOn(lines, 'getCommandData').andReturn(commandData);

        // act
        var result: ICommandAnswer = lines.getCommandAnswer(commandString);

        // assert
        expect(result.succes).toBeFalsy();
        expect(result.value).toBe(util.format(Messages.UNABLE_TO_EXECUTE, commandString));
    });

    it('getCommandAnswer should return succes = false when the CommandMethod.method is undefined.', () => {
        // arange
        settingCommandMethod.method = undefined;
        spyOn(lines, 'getCommandData').andReturn(commandData);

        // act
        var result: ICommandAnswer = lines.getCommandAnswer(commandString);

        // assert
        expect(result.succes).toBeFalsy();
        expect(result.value).toBe(util.format(Messages.UNABLE_TO_EXECUTE, commandString));
    });

    it('getCommandAnswer should call getCommandData on lines.', () => {
        // arange
        spyOn(lines, 'getCommandData').andReturn(commandData);

        // act
        lines.getCommandAnswer(commandString);

        // assert
        expect(lines.getCommandData).toHaveBeenCalledWith(commandString);
        expect((<jasmine.Spy>lines.getCommandData).calls.length).toEqual(1);
    });

    it('getCommandData should return command if string matches', () => {
        // arange

        // act
        var result: ICommandData = lines.getCommandData(commandString);

        // assert
        expect(result.command).toBe(CommandEnum.settings);
    });

    it('getCommandData should return command is undefined when string contains only spaces', () => {
        // arange

        // act
        var result: ICommandData = lines.getCommandData(' ');

        // assert
        expect(result.command).toBe(undefined);
    });

    it('getCommandData should return command is undefined when string contains an invalid command', () => {
        // arange

        // act
        var result: ICommandData = lines.getCommandData('doesnotexcist');

        // assert
        expect(result.command).toBe(undefined);
    });

    it('getCommandData should return subCommand if string matches', () => {
        // arange

        // act
        var result: ICommandData = lines.getCommandData(commandString);

        // assert
        expect(result.subCommand).toBe(SubCommandEnum.your_bot);
    });

    it('getCommandData should return subCommand undefined if string contains only 1 linepart and should not crash', () => {
        // arange
        commandString = CommandEnum[CommandEnum.settings];

        // act
        var result: ICommandData = lines.getCommandData(commandString);

        // assert
        expect(result.subCommand).toBe(undefined);
    });

    it('getCommandData should return subCommand undefined for a command which has no subCommand', () => {
        // arange
        commandString = [CommandEnum[CommandEnum.update_map], '1 player1 2 2 player1 4 3 neutral 2 4 player2 5'].join(' ');

        // act
        var result: ICommandData = lines.getCommandData(commandString);

        // assert
        expect(result.subCommand).toBe(undefined);
    });
});