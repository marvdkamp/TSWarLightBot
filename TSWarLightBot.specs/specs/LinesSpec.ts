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
import ICommandAction = require('../../TSWarLightBot/ICommandAction');

describe("lines.test", () => {
    var Lines: any = require("../../TSWarLightBot/Lines");
    var lines: ILines;
    var settingCommandAction: any = jasmine.createSpy('settingCommandAction');
    var commandAction: any = jasmine.createSpy('commandAction');
    settingCommandAction.command = 'setting';
    settingCommandAction.action = commandAction;

    beforeEach(() => {
        lines = new Lines([settingCommandAction]);
    });

    it("Should call the right action if data string mathches.", () => {
        // arange

        // act
        lines.getCommandResult('setting');

        // assert
        expect(commandAction).toHaveBeenCalled();
    });
});