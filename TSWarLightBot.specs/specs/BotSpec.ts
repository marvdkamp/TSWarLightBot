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
/// <reference path="../Scripts/typings/node/node.d.ts" />
/// <reference path="../Scripts/typings/jasmine/jasmine.d.ts" />

import readline = require('readline');

describe("bot.run", () => {
    var io: any = jasmine.createSpyObj('io', ['on']);
    var Bot = require("../../TSWarLightBot/Bot");
    var bot: any;

    beforeEach(() => {
        bot = new Bot(io);
    });

    it("Should call on on io with specific arguments.", () => {
        bot.run();
        expect(io.on).toHaveBeenCalledWith('line', jasmine.any(Function));
        expect(io.on).toHaveBeenCalledWith('close', jasmine.any(Function));
        expect(io.on.callCount).toBe(2);
    });
});   