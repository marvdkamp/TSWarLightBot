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
import IBotCommands = require('IBotCommands');

/**
 * Main class of the app. Handles reading from and writing to the console.
 */
class Bot implements IBot {
    private io: readline.ReadLine;
    private botCommands: IBotCommands;

    constructor(io: readline.ReadLine, botCommands: IBotCommands) {
        this.io = io;
        this.botCommands = botCommands;
    }

    /**
     * Main entry point of the app.
     */
    public run() {
        var that: Bot = this;
        this.io.on('line', (data: string) => {
            if (that.botCommands.isACommand(data)) {
                that.botCommands.callCommand(data);
            }
        });

        this.io.on('close', () => {
        });
    }
}

export = Bot;