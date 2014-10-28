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

/**
 * Instantiates the main class (Bot) injects all the dependencies and starts the bot.
 */

import Bot = require('./Bot');
import readline = require('readline');
import Lines = require('./Lines');
import GoCommand = require('./command/GoCommand');
import OpponentMovesCommand = require('./command/OpponentMovesCommand');
import PickStartingRegionsCommand = require('./command/PickStartingRegionsCommand');
import SettingsCommand = require('./command/SettingsCommand');
import SetupMapCommand = require('./command/SetupMapCommand');
import UpdateMapCommand = require('./command/UpdateMapCommand');
import IOptionSetting = require('./command/interface/IOptionSetting');
import ICommandMethod = require('./interface/ICommandMethod');
import CommandEnum = require('./enum/CommandEnum');
import WarMap = require('./map/WarMap');

var settings: IOptionSetting = {};
var warMap: WarMap = new WarMap();
var goCommand = new GoCommand(settings, warMap);
var opponentMovesCommand = new OpponentMovesCommand();
var pickStartingRegionsCommand = new PickStartingRegionsCommand();
var settingsCommand = new SettingsCommand(settings);
var setupMapCommand = new SetupMapCommand(warMap);
var updateMapCommand = new UpdateMapCommand(settings, warMap);

var commandMethods: ICommandMethod = {};
commandMethods[CommandEnum.go] = goCommand.getAnswer;
commandMethods[CommandEnum.opponent_moves] = opponentMovesCommand.getAnswer;
commandMethods[CommandEnum.pick_starting_regions] = pickStartingRegionsCommand.getAnswer;
commandMethods[CommandEnum.settings] = settingsCommand.getAnswer;
commandMethods[CommandEnum.setup_map] = setupMapCommand.getAnswer;
commandMethods[CommandEnum.update_map] = updateMapCommand.getAnswer;

var readLineOptions: readline.ReadLineOptions = {
    input: process.stdin,
    output: process.stdout
};

var io: readline.ReadLine = readline.createInterface(readLineOptions);
var lines = new Lines(commandMethods);

var bot = new Bot(io, lines, process);
bot.run();