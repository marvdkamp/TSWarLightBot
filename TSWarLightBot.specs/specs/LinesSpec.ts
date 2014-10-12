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

describe('lines.test', () => {
    var Lines: any = require("../../TSWarLightBot/Lines");
    var lines: ILines;
    var settingCommandNameMethod: any = jasmine.createSpy('settingCommandNameMethod');
    var settingCommandMethod: any = jasmine.createSpy('settingCommandMethod');
    settingCommandNameMethod.commandName = 'setting';
    settingCommandNameMethod.method = settingCommandMethod;

    beforeEach(() => {
        lines = new Lines([settingCommandNameMethod]);
    });

    it('Should call the right action if data string mathches.', () => {
        // arange
        spyOn(lines, 'getCommandData').andReturn({
            commandName: 'setting',
            data: ['']
        });

        // act
        lines.getCommandResult('setting');

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
        spyOn(lines, 'getCommandData').andReturn({
            commandName: 'setting'
        });

        // act
        lines.getCommandResult('setting');

        // assert
        expect(lines.getCommandData).toHaveBeenCalledWith('setting');
        expect((<jasmine.Spy>lines.getCommandData).calls.length).toEqual(1);
    });
});