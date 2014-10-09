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
import ICommands = require('ILines');

/**
 * Main class of the app. Handles reading from and writing to the console.
 */
class Bot implements IBot {

    constructor(private io: readline.ReadLine, private commands: ICommands, private botProcess: NodeProcess) {
    }

    /**
     * Main entry point of the app. Attaching events to the ReadLine instance.
     */
    public run() {
        var that: Bot = this;
        this.io.on('line', (data: string) => {
            that.handleLine(data);
        });

        this.io.on('close', () => {
            that.handleClose();
        });
    }

    /**
     * Handle a incoming command from the game engine.
     */
    public handleLine(data: string): void {
        if (data.length === 0) {
            return;
        }

        var result = this.commands.callCommand(data);
        if (result.succes) {
            this.botProcess.stdout.write(result.value);
        } else {
            this.botProcess.stderr.write(result.value);
        }
    }

    /**
     * Handle a close command from the game engine.
     */
    public handleClose(): void {
        this.botProcess.exit(0);
    }
}

export = Bot;