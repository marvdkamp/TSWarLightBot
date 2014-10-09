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

import ICommands = require('../../TSWarLightBot/ICommands');
import ICommandAction = require('../../TSWarLightBot/ICommandAction');

describe("commands.test", () => {
    var Commands: any = require("../../TSWarLightBot/Commands");
    var commands: ICommands;
    var settingCommandAction: any = jasmine.createSpy('settingCommandAction');
    var commandAction: any = jasmine.createSpy('commandAction');
    settingCommandAction.command = 'setting';
    settingCommandAction.action = commandAction;

    beforeEach(() => {
        commands = new Commands([settingCommandAction]);
    });

    it("Should call the right action if data string mathches.", () => {
        // arange

        // act
        commands.callCommand('setting');

        // assert
        expect(commandAction).toHaveBeenCalled();
    });
});