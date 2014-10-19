﻿/**
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

//TODO: Split lines!!!!
//TODO: Trim lines!!!!

import readline = require('readline');
import IBot = require('../../TSWarLightBot/interface/IBot');
import CommandEnum = require('../../TSWarLightBot/enum/CommandEnum');
import OptionEnum = require('../../TSWarLightBot/enum/OptionEnum');

describe('bot', () => {
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

    var lines: any = jasmine.createSpyObj('lines', ['getCommandAnswer']);
    var commandAnswer: any = jasmine.createSpy('commandAnswer');
    lines.getCommandAnswer.andReturn(commandAnswer);

    var botProcess: any = {
        stdout: jasmine.createSpyObj('stdout', ['write']),
        stderr: jasmine.createSpyObj('stderr', ['write']),
        exit: jasmine.createSpy('exit')
    }

    var commandString: string = [CommandEnum[CommandEnum.settings], OptionEnum[OptionEnum.your_bot], 'player1'].join(' ');

    beforeEach(() => {
        bot = new Bot(io, lines, botProcess);
    });

    afterEach(() => {
        lines.getCommandAnswer.reset();
        io.on.reset();
        botProcess.stdout.write.reset();
        botProcess.stderr.write.reset();
    });

    describe('run', () => {
        it('Should call on on io with line and close arguments to attach events.', () => {
            // arange

            // act
            bot.run();

            // assert
            expect(io.on).toHaveBeenCalledWith('line', jasmine.any(Function));
            expect(io.on).toHaveBeenCalledWith('close', jasmine.any(Function));
            expect(io.on.callCount).toBe(2);
        });

        it('Should attach the right methodes to the events.', () => {
            // arange
            spyOn(bot, 'handleLine');
            spyOn(bot, 'handleClose');

            // act
            bot.run();
            lineListener(commandString);
            closeListener();

            // assert
            expect(bot.handleLine).toHaveBeenCalledWith(commandString);
            expect(bot.handleClose).toHaveBeenCalled();
        });
    });

    describe('handleLine', () => {
        it('Should call getCommandAnswer on lines.', () => {
            // arange

            // act
            bot.handleLine(commandString);

            // assert
            expect(lines.getCommandAnswer).toHaveBeenCalled();
            expect(lines.getCommandAnswer.callCount).toBe(1);
        });

        it('Should NOT call getCommandAnswer on lines if string is empty.', () => {
            // arange

            // act
            bot.handleLine('');

            // assert
            expect(lines.getCommandAnswer).not.toHaveBeenCalled();
            expect(lines.getCommandAnswer.callCount).toBe(0);
        });

        it('Should call process.stdout.write on lines if result is succesfull.', () => {
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

        it('Should call process.stderr.write on lines if commandName is NOT succesfull.', () => {
            // arange
            commandAnswer.succes = false;
            commandAnswer.value = 'test';

            // act
            bot.handleLine('doesnotexcist');

            // assert
            expect(botProcess.stderr.write).toHaveBeenCalled();
            expect(botProcess.stderr.write.callCount).toBe(1);
            expect(botProcess.stdout.write.callCount).toBe(0);
        });
    });

    describe('handleClose', () => {
        it('Should call process.exit(0) if handleClose is called.', () => {
            // act
            bot.handleClose();

            // assert
            expect(botProcess.exit).toHaveBeenCalled();
            expect(botProcess.exit.callCount).toBe(1);
        });
    });
});   