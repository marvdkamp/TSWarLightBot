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
    public run() {
        var readLineOptions: readline.ReadLineOptions = {
            input: process.stdin,
            output: process.stdout
        };

        var io: readline.ReadLine = readline.createInterface(readLineOptions);

        io.on('line', (data: string) => {
            // stop if line doesn't contain anything
            if (data.length === 0) {
                return;
            }

            process.stdout.write(data + '\n');
        });

        io.on('close', () => {
            process.exit(0);
        });

    }
}

var bot = new Bot();
bot.run();