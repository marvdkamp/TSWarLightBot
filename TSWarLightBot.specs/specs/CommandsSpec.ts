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

describe("commands.test", () => {
    var Commands: any = require("../../TSWarLightBot/Commands");
    var commands: ICommands;

    beforeEach(() => {
        commands = new Commands();
    });
});