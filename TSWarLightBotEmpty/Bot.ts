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
'use strict';

import readline = require('readline');
import IBot = require('./interface/IBot');
import ILines = require('./interface/ILines');
import IAnswer = require('./interface/IAnswer');

/*
 * Main class of the app. Handles reading from and writing to the console. Will be instantiated and run from Runner.ts.
 */
class Bot implements IBot {

    /*
     * Create an instance of the Bot class.
     * @constructor
     * @param io {readline.ReadLine} - Allows reading of a stream (such as process.stdin) on a line-by-line basis.
     * @param lines {ILines} - ILine instance which converts lines to command information and passes it to the right command class and 
     *                         returns the answer.
     * @param botProcess {NodeProccess} - global object for listening to events. Injected so we can mock it in tests.
     */
    constructor(private io: readline.ReadLine, private lines: ILines, private botProcess: NodeProcess) {
    }

    /**
     * Main entry point of the app. Attaching events to the ReadLine instance.
     */
    public run(): void {
        var that: Bot = this;
        this.io.on('line', (data: string): void => {
            that.handleLine(data);
        });

        this.io.on('close', (): void => {
            that.handleClose();
        });
    }

    /**
     * Handle a incoming command from the game engine.
     * @param data {string} - a string containing a command send to the console.
     * Example handleLine('setup_map regions 1 1 2 1 3 2 4 2 5 2');
     */
    public handleLine(data: string): void {
        if (data.length === 0) {
            return;
        }

        var result: IAnswer = this.lines.getAnswer(data);
        if (result.succes) {
            if (result.value.length > 0) {
                this.botProcess.stdout.write(result.value);
            }
        } else {
            this.botProcess.stderr.write(result.value);
        }
    }

    /**
     * Handle a close command from the process.
     */
    public handleClose(): void {
        this.botProcess.exit(0);
    }
}

export = Bot;