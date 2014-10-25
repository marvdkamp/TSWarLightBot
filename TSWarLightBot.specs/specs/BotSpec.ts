/*
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
'use strict';

// TODO: Split lines!!!!
// TODO: Trim lines!!!!

require('readline');
import IBot = require('../../TSWarLightBot/interface/IBot');
import CommandEnum = require('../../TSWarLightBot/enum/CommandEnum');
import OptionEnum = require('../../TSWarLightBot/enum/OptionEnum');

describe('bot', (): void => {
    var Bot: any = require('../../TSWarLightBot/Bot');
    var bot: IBot;
    var io: any = jasmine.createSpyObj('io', ['on']);
    var lineListener: (data: string) => void;
    var closeListener: () => void;
    io.on.andCallFake(function (event: string, listener: (data?: string) => void): void {
        if (event === 'line') {
            lineListener = listener;
        };

        if (event === 'close') {
            closeListener = listener;
        }
    });

    var lines: any = jasmine.createSpyObj('lines', ['getAnswer']);
    var commandAnswer: any = jasmine.createSpy('commandAnswer');
    lines.getAnswer.andReturn(commandAnswer);

    var botProcess: any = {
        stdout: jasmine.createSpyObj('stdout', ['write']),
        stderr: jasmine.createSpyObj('stderr', ['write']),
        exit: jasmine.createSpy('exit')
    };

    var commandString: string = [CommandEnum[CommandEnum.settings], OptionEnum[OptionEnum.your_bot], 'player1'].join(' ');

    beforeEach((): void => {
        bot = new Bot(io, lines, botProcess);
    });

    afterEach((): void => {
        lines.getAnswer.reset();
        io.on.reset();
        botProcess.stdout.write.reset();
        botProcess.stderr.write.reset();
    });

    describe('run', (): void => {
        // io.on attaches events for reading from the console and closing the console.
        // call count should be 2.
        it('Should call io.on with line and close arguments.', (): void => {
            // arange

            // act
            bot.run();

            // assert
            expect(io.on).toHaveBeenCalledWith('line', jasmine.any(Function));
            expect(io.on).toHaveBeenCalledWith('close', jasmine.any(Function));
            expect(io.on.callCount).toBe(2);
        });

        // Check if commandString is handed to the handLine method.
        it('Should attach bot.handleLine and bot.handleClose to the io.on line and io.on close events.', (): void => {
            // arange
            spyOn(bot, 'handleLine');
            spyOn(bot, 'handleClose');

            // act
            bot.run();
            lineListener(commandString);
            closeListener();

            // assert
            expect(bot.handleLine).toHaveBeenCalledWith(commandString);
            expect((<jasmine.Spy>bot.handleLine).callCount).toBe(1);
            expect((<jasmine.Spy>bot.handleClose).callCount).toBe(1);
        });
    });

    describe('handleLine', (): void => {
        // lines get injected in the Bot instances.
        // should only be called once. 
        it('Should call getAnswer on lines if called with commandstring.', (): void => {
            // arange

            // act
            bot.handleLine(commandString);

            // assert
            expect(lines.getAnswer.callCount).toBe(1);
        });

        // lines get injected in the Bot instances.
        it('Should NOT call getAnswer on lines if commandstring is empty.', (): void => {
            // arange

            // act
            bot.handleLine('');

            // assert
            expect(lines.getAnswer).not.toHaveBeenCalled();
            expect(lines.getAnswer.callCount).toBe(0);
        });

        // process get injected in the Bot instances.
        // Should call stdout one time. Should NOT call stderr.
        it('Should call botProcess.stdout.write if result is succesfull.', (): void => {
            // arange
            commandAnswer.succes = true;
            commandAnswer.value = 'test';

            // act
            bot.handleLine(commandString);

            // assert
            expect(botProcess.stdout.write).toHaveBeenCalled();
            expect(botProcess.stdout.write.callCount).toBe(1);
            expect(botProcess.stderr.write.callCount).toBe(0);
        });

        // botProcess get injected in the Bot instances.
        // Should NOT call stdout. Should call stderr one time.
        // Check if command.value is passes to write.
        it('Should call botProcess.stderr.write if commandName is NOT succesfull.', (): void => {
            // arange
            commandAnswer.succes = false;
            commandAnswer.value = 'Unable to execute command: doesnotexcist';

            // act
            bot.handleLine('doesnotexcist');

            // assert
            expect(botProcess.stderr.write).toHaveBeenCalledWith(commandAnswer.value);
            expect(botProcess.stderr.write.callCount).toBe(1);
            expect(botProcess.stdout.write.callCount).toBe(0);
        });
    });

    describe('handleClose', (): void => {
        // Should call exit one time.
        it('Should call botProcess.exit.', (): void => {
            // act
            bot.handleClose();

            // assert
            expect(botProcess.exit).toHaveBeenCalled();
            expect(botProcess.exit.callCount).toBe(1);
        });
    });
});   