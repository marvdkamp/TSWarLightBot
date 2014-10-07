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

import readline = require('readline');
import IBot = require('IBot');
import ICommands = require('ICommands');

/**
 * Main class of the app. Handles reading from and writing to the console.
 */
class Bot implements IBot {
    private io: readline.ReadLine;
    private commands: ICommands;

    constructor(io: readline.ReadLine, commands: ICommands) {
        this.io = io;
        this.commands = commands;
    }

    /**
     * Main entry point of the app.
     */
    public run() {
        var that: Bot = this;
        this.io.on('line', (data: string) => {
            if (that.commands.isACommand(data)) {
                that.commands.callCommand(data);
            }
        });

        this.io.on('close', () => {
        });
    }
}

export = Bot;