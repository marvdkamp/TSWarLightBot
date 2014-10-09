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

import readline = require('readline');
import IBot = require('../../TSWarLightBot/IBot');

describe("bot.test", () => {
    var Bot: any = require("../../TSWarLightBot/Bot");
    var bot: IBot;
    var io: any = jasmine.createSpyObj('io', ['on']);
    var lineListener: (data: string) => void;
    var closeListener: () => void;
    io.on.andCallFake(function (event: string, listener: (data?: string) => void) {
        if (event === 'line') {
            lineListener = listener;
        };

        if (event === 'close') {
            closeListener = listener;
        }
    });

    var lines: any = jasmine.createSpyObj('lines', ['getCommandResult']);
    var commandResult: any = jasmine.createSpy('commandResult');
    lines.getCommandResult.andReturn(commandResult);

    var botProcess: any = {
        stdout: jasmine.createSpyObj('stdout', ['write']),
        stderr: jasmine.createSpyObj('stderr', ['write']),
        exit: jasmine.createSpy('exit')
    }

    beforeEach(() => {
        bot = new Bot(io, lines, botProcess);
    });

    afterEach(() => {
        lines.getCommandResult.reset();
        io.on.reset();
        botProcess.stdout.write.reset();
        botProcess.stderr.write.reset();
    });

    it("Should call on on io with line and close arguments to attach events.", () => {
        // arange

        // act
        bot.run();

        // assert
        expect(io.on).toHaveBeenCalledWith('line', jasmine.any(Function));
        expect(io.on).toHaveBeenCalledWith('close', jasmine.any(Function));
        expect(io.on.callCount).toBe(2);
    });

    it("Should attach the right methodes to the events.", () => {
        // arange
        spyOn(bot, 'handleLine');
        spyOn(bot, 'handleClose');

        // act
        bot.run();
        lineListener('test');
        closeListener();

        // assert
        expect(bot.handleLine).toHaveBeenCalled();
        expect(bot.handleClose).toHaveBeenCalled();
    });

    it("Should call getCommandResult on lines.", () => {
        // arange

        // act
        bot.handleLine('settings');

        // assert
        expect(lines.getCommandResult).toHaveBeenCalled();
        expect(lines.getCommandResult.callCount).toBe(1);
    });

    it("Should NOT call getCommandResult on lines if string is empty.", () => {
        // arange

        // act
        bot.handleLine('');

        // assert
        expect(lines.getCommandResult).not.toHaveBeenCalled();
        expect(lines.getCommandResult.callCount).toBe(0);
    });

    it("Should call process.stdout.write on lines if result is succesfull.", () => {
        // arange
        commandResult.succes = true;
        commandResult.value = 'test';

        // act
        bot.handleLine('settings');

        // assert
        expect(botProcess.stdout.write).toHaveBeenCalled();
        expect(botProcess.stdout.write.callCount).toBe(1);
        expect(botProcess.stderr.write.callCount).toBe(0);
    });

    it("Should call process.stderr.write on lines if commandName is NOT succesfull.", () => {
        // arange
        commandResult.succes = false;
        commandResult.value = 'test';

        // act
        bot.handleLine('settings');

        // assert
        expect(botProcess.stderr.write).toHaveBeenCalled();
        expect(botProcess.stderr.write.callCount).toBe(1);
        expect(botProcess.stdout.write.callCount).toBe(0);
    });

    it("Should call process.exit(0) if handleClose is called.", () => {
        // act
        bot.handleClose();

        // assert
        expect(botProcess.exit).toHaveBeenCalled();
        expect(botProcess.exit.callCount).toBe(1);
    });
});   