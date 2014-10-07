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
import ICommands = require('../../TSWarLightBot/ICommands');
import CommandResult = require('../../TSWarLightBot/CommandResult');

describe("bot.test", () => {
    var Bot: any = require("../../TSWarLightBot/Bot");
    var bot: IBot;
    var io: any = jasmine.createSpyObj('io', ['on']);
    io.on.andCallFake(function (event: string, listener: (data: string) => void) {
        if (event === 'line') {
            lineListener = listener;
        }
    });

    var commands: any = jasmine.createSpyObj('commands', ['callCommand']);
    //var stdout: any = jasmine.createSpyObj('stdout', ['write']);
    //var stderr: any = jasmine.createSpyObj('stderr', ['write']);
    //var botProcess: any = jasmine.createSpyObj('botProcess', ['stdout', 'stderr']);

    var botProcess = {
        stdout: jasmine.createSpyObj('stdout', ['write']),
        stderr: jasmine.createSpyObj('stderr', ['write'])
    }

    var lineListener: (data: string) => void;

    beforeEach(() => {
        bot = new Bot(io, commands, botProcess);
    });

    afterEach(() => {
        commands.callCommand.reset();
        io.on.reset();
        botProcess.stdout.write.reset();
        botProcess.stderr.write.reset();
    });

    it("Should call on on io with specific arguments.", () => {
        // arange

        // act
        bot.run();

        // assert
        expect(io.on).toHaveBeenCalledWith('line', jasmine.any(Function));
        expect(io.on).toHaveBeenCalledWith('close', jasmine.any(Function));
        expect(io.on.callCount).toBe(2);
    });

    it("Should call callCommand on commands", () => {
        // arange
        commands.callCommand.andReturn(new CommandResult(true, 'test'));

        // act
        bot.run();

        // assert
        lineListener('settings');
        expect(commands.callCommand).toHaveBeenCalled();
        expect(commands.callCommand.callCount).toBe(1);
    });

    it("Should call process.stdout.write on commands if commandName matches", () => {
        // arange
        commands.callCommand.andReturn(new CommandResult(true, 'test'));

        // act
        bot.run();

        // assert
        lineListener('settings');
        expect(botProcess.stdout.write).toHaveBeenCalled();
        expect(botProcess.stdout.write.callCount).toBe(1);
        expect(botProcess.stderr.write.callCount).toBe(0);
    });

    it("Should call process.stderr.write on commands if commandName NOT matches", () => {
        // arange
        commands.callCommand.andReturn(new CommandResult(false, 'test'));

        // act
        bot.run();

        // assert
        lineListener('nocommand');
        expect(botProcess.stderr.write).toHaveBeenCalled();
        expect(botProcess.stderr.write.callCount).toBe(1);
        expect(botProcess.stdout.write.callCount).toBe(0);
    });
});   