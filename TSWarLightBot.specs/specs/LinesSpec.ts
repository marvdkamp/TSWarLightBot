/**
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
import Messages = require('../../TSWarLightBot/Messages');
import util = require('util');
import CommandEnum = require('../../TSWarLightBot/CommandEnum');
import SubCommandEnum = require('../../TSWarLightBot/SubCommandEnum');

describe('lines.test', () => {
    var Lines: any = require("../../TSWarLightBot/Lines");
    var lines: ILines;
    var settingCommandNameMethod: any = jasmine.createSpy('settingCommandNameMethod');
    var settingCommandMethod: any = jasmine.createSpy('settingCommandMethod');
    settingCommandNameMethod.commandName = 'settings';
    settingCommandNameMethod.method = settingCommandMethod;

    beforeEach(() => {
        lines = new Lines([settingCommandNameMethod]);
    });

    it('Should call the right action if data string mathches.', () => {
        // arange
        spyOn(lines, 'getCommandData').andReturn({
            commandName: 'settings',
            data: ['']
        });

        // act
        lines.getCommandResult('settings your_bot player1');

        // assert
        expect(settingCommandMethod).toHaveBeenCalled();
    });

    it('Should return succes = false when the data string NOT matches.', () => {
        // arange
        spyOn(lines, 'getCommandData').andReturn({
            commandName: 'doesnotexcist',
            data: ['']
        });

        // act
        var result: ICommandResult = lines.getCommandResult('doesnotexcist');

        // assert
        expect(result.succes).toBeFalsy(); 
        expect(result.value).toBe(util.format(Messages.UNABLE_TO_EXECUTE, 'doesnotexcist', ''));
    });

    it('Should call getCommandData on lines.', () => {
        // arange
        var commandString: string = CommandEnum[CommandEnum.settings] + ' ' + SubCommandEnum[SubCommandEnum.your_bot] + 'player1';
        spyOn(lines, 'getCommandData').andReturn({
            commandName: CommandEnum[CommandEnum.settings]
        });

        // act
        lines.getCommandResult(commandString);

        // assert
        expect(lines.getCommandData).toHaveBeenCalledWith(commandString);
        expect((<jasmine.Spy>lines.getCommandData).calls.length).toEqual(1);
    });
});