/**
 * Warlight AI Game Bot
 *
 * Oktober 2014
 *
 * Based on Niko van Meurs javascript bot from http://theaigames.com/competitions/warlight-ai-challenge/getting-started
 *
 * @authors Marcel van de Kamp and Taeke van der Veen
 * @License MIT License (http://opensource.org/Licenses/MIT)
 */

/**
 * Instantiates the main class (Bot) injects all the dependencies and starts the bot.
 */

import Bot = require('./Bot');
import readline = require('readline');
import Lines = require('./Lines');

var readLineOptions: readline.ReadLineOptions = {
    input: process.stdin,
    output: process.stdout
};

var io: readline.ReadLine = readline.createInterface(readLineOptions);
var lines = new Lines([]);

var bot = new Bot(io, lines, process);
bot.run();