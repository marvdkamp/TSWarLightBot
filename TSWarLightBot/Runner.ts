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
import GoCommand = require('./command/GoCommand');
import Opponent_movesCommand = require('./command/Opponent_movesCommand');
import Pick_starting_regionsCommand = require('./command/Pick_starting_regionsCommand');
import SettingsCommand = require('./command/SettingsCommand');
import Setup_mapCommand = require('./command/Setup_mapCommand');
import Update_mapCommand = require('./command/Update_mapCommand');
import IOptionSetting = require('./command/interface/IOptionSetting');
import ICommandMethod = require('./interface/ICommandMethod');
import CommandEnum = require('./enum/CommandEnum');
import SubCommandEnum = require('./enum/SubCommandEnum');
import WarMap = require('./map/WarMap');

var settings: IOptionSetting = {};
var goCommand = new GoCommand(settings, new WarMap());
var opponent_movesCommand = new Opponent_movesCommand();
var pick_starting_regionsCommand = new Pick_starting_regionsCommand();
var settingsCommand = new SettingsCommand();
var setup_mapCommand = new Setup_mapCommand();
var update_mapCommand = new Update_mapCommand();

var commandMethods: ICommandMethod = {};
commandMethods[CommandEnum.go] = goCommand.getCommandAnswer;
commandMethods[CommandEnum.opponent_moves] = opponent_movesCommand.getCommandAnswer;
commandMethods[CommandEnum.pick_starting_regions] = pick_starting_regionsCommand.getCommandAnswer;
commandMethods[CommandEnum.settings] = settingsCommand.getCommandAnswer;
commandMethods[CommandEnum.setup_map] = setup_mapCommand.getCommandAnswer;
commandMethods[CommandEnum.update_map] = update_mapCommand.getCommandAnswer;

var readLineOptions: readline.ReadLineOptions = {
    input: process.stdin,
    output: process.stdout
};

var io: readline.ReadLine = readline.createInterface(readLineOptions);
var lines = new Lines(commandMethods);

var bot = new Bot(io, lines, process);
bot.run();