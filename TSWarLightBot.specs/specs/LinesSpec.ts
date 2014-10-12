﻿/**
 * Warlight AI Game Bot
 *
 * Oktober 2014
 *
 * Based on Niko van Meurs javascript bot from http://theaigames.com/competitions/warlight-ai-challenge/getting-started
 *
 * @authors Marcel van der Kamp and Taeke van der Veen
 * @License MIT License (http://opensource.org/Licenses/MIT)
 */
/// <reference path="../Scripts/typings/jasmine/legacy/jasmine-1.3.d.ts" />

import ILines = require('../../TSWarLightBot/ILines');
import ICommandResult = require('../../TSWarLightBot/ICommandResult');
import ICommandNameMethod = require('../../TSWarLightBot/ICommandNameMethod');
import ICommandData = require('../../TSWarLightBot/ICommandData');
import Messages = require('../../TSWarLightBot/Messages');
import util = require('util');
import CommandEnum = require('../../TSWarLightBot/CommandEnum');
import SubCommandEnum = require('../../TSWarLightBot/SubCommandEnum');

describe('lines.test', () => {
    var Lines: any = require("../../TSWarLightBot/Lines");
    var lines: ILines;
    var settingCommandNameMethod: any = jasmine.createSpy('settingCommandNameMethod');
    var commandString: string;
    var commandData = {
        command: CommandEnum.settings,
        data: ['']
    };
    var settingCommandMethod: any = jasmine.createSpy('settingCommandMethod');

    beforeEach(() => {
        settingCommandNameMethod.command = CommandEnum.settings;
        settingCommandNameMethod.method = settingCommandMethod;
        commandString = [CommandEnum[CommandEnum.settings], SubCommandEnum[SubCommandEnum.your_bot], 'player1'].join(' ');
        lines = new Lines([settingCommandNameMethod]);
    });

    it('getCommandResult should call the right action if data command mathches.', () => {
        // arange
        spyOn(lines, 'getCommandData').andReturn(commandData);

        // act
        lines.getCommandResult(commandString);

        // assert
        expect(settingCommandMethod).toHaveBeenCalled();
    });

    it('getCommandResult should return succes = false when the data string NOT matches.', () => {
        // arange
        commandString = 'doesnotexcist';
        spyOn(lines, 'getCommandData').andReturn({
            command: undefined,
            data: []
        });

        // act
        var result: ICommandResult = lines.getCommandResult(commandString);

        // assert
        expect(result.succes).toBeFalsy(); 
        expect(result.value).toBe(util.format(Messages.UNABLE_TO_EXECUTE, commandString));
    });

    it('getCommandResult should return succes = false when the CommandNameMethod.method is null.', () => {
        // arange
        settingCommandNameMethod.method = null;
        spyOn(lines, 'getCommandData').andReturn(commandData);

        // act
        var result: ICommandResult = lines.getCommandResult(commandString);

        // assert
        expect(result.succes).toBeFalsy();
        expect(result.value).toBe(util.format(Messages.UNABLE_TO_EXECUTE, commandString));
    });

    it('getCommandResult should return succes = false when the CommandNameMethod.method is undefined.', () => {
        // arange
        settingCommandNameMethod.method = undefined;
        spyOn(lines, 'getCommandData').andReturn(commandData);

        // act
        var result: ICommandResult = lines.getCommandResult(commandString);

        // assert
        expect(result.succes).toBeFalsy();
        expect(result.value).toBe(util.format(Messages.UNABLE_TO_EXECUTE, commandString));
    });

    it('getCommandResult should call getCommandData on lines.', () => {
        // arange
        spyOn(lines, 'getCommandData').andReturn(commandData);

        // act
        lines.getCommandResult(commandString);

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
});