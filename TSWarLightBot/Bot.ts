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
/// <reference path="Scripts/typings/node/node.d.ts" />
import readline = require('readline');

class Bot {
    private io: readline.ReadLine;

    constructor(io: readline.ReadLine) {
        this.io = io;
    }

    public run() {
        this.io.on('line', (data: string) => {
        });

        this.io.on('close', () => {
        });
    }
}

export = Bot;