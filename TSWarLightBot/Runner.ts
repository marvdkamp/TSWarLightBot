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
'use strict';

/**
 * Instantiates the main class (Bot) injects all the dependencies and starts the bot.
 */

import Bot = require('./Bot');
import readline = require('readline');
import Lines = require('./Lines');
import Go = require('./command/Go');
import Opponent_moves = require('./command/Opponent_moves');
import Pick_starting_regions = require('./command/Pick_starting_regions');
import Settings = require('./command/Settings');
import Setup_map = require('./command/Setup_map');
import Update_map = require('./command/Update_map');
import ISubCommandOption = require('./command/ISubCommandOption');
import ICommandMethod = require('./ICommandMethod');
import CommandEnum = require('./CommandEnum');
import SubCommandEnum = require('./SubCommandEnum');
import WarMap = require('./map/WarMap');

var options: ISubCommandOption[] = [{
    subCommand: SubCommandEnum.starting_armies,
    value: '0'
}];

var go = new Go(options, new WarMap());
var opponent_moves = new Opponent_moves();
var pick_starting_regions = new Pick_starting_regions();
var settings = new Settings();
var setup_map = new Setup_map();
var update_map = new Update_map();

var commandMethods: ICommandMethod[] = [{
    command: CommandEnum.go,
    method: go.getCommandAnswer
}, {
    command: CommandEnum.opponent_moves,
    method: opponent_moves.getCommandAnswer
}, {
    command: CommandEnum.pick_starting_regions,
    method: pick_starting_regions.getCommandAnswer
}, {
    command: CommandEnum.settings,
    method: settings.getCommandAnswer
}, {
    command: CommandEnum.setup_map,
    method: setup_map.getCommandAnswer
}, {
    command: CommandEnum.update_map,
    method: update_map.getCommandAnswer
}];

var readLineOptions: readline.ReadLineOptions = {
    input: process.stdin,
    output: process.stdout
};

var io: readline.ReadLine = readline.createInterface(readLineOptions);
var lines = new Lines(commandMethods);

var bot = new Bot(io, lines, process);
bot.run();