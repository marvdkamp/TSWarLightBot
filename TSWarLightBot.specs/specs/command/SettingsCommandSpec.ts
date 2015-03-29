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
/// <reference path="../../Scripts/typings/jasmine/legacy/jasmine-1.3.d.ts" />
'use strict';

import IOptionSetting = require('../../../TSWarLightBot/command/interface/IOptionSetting');
import ICommandData = require('../../../TSWarLightBot/interface/ICommandData');
import OptionEnum = require('../../../TSWarLightBot/enum/OptionEnum');
import CommandEnum = require('../../../TSWarLightBot/enum/CommandEnum');
import SettingsCommand = require('../../../TSWarLightBot/command/SettingsCommand');
import ShuffleArray = require('../../../TSWarLightBot/command/helper/ShuffleArray');
import Consts = require('../../../TSWarLightBot/Consts');
import util = require('util');

describe('settingsCommand', (): void => {
    var settingsCommand: SettingsCommand;
    var settings: IOptionSetting;


    beforeEach((): void => {
        settings = { };

        settingsCommand = new SettingsCommand(settings);
    });

    // error string should be filled too.
    it('Should return Answer.succes = false in Answer.value if ICommandData.option not matches an option in settingsCommand.', (): void => {
        // arange
        var commandData: ICommandData = {
            line: 'testline',
            data: new ShuffleArray<string>(['']),
            option: OptionEnum.place_armies,
            command: CommandEnum.settings
        };

        // act
        var result = settingsCommand.getAnswer(commandData);

        // assert
        expect(result.succes).toBe(false);
        expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandData.line));
    });

    it('should save the player name to the your_bot setting when the your_bot command is called', (): void => {
        // arrange
        var playerName = 'player1';
        var commandData: ICommandData = {
            line: '',
            data: new ShuffleArray<string>([playerName]),
            option: OptionEnum.your_bot,
            command: CommandEnum.settings
        };

        // act
        settingsCommand.getAnswer(commandData);

        // assert
        expect(settings[OptionEnum.your_bot]).toEqual(playerName);
    });

    it('should save the opponents name to the settings when the opponent_name command is called', (): void => {
        // arrange
        var opponentName = 'player2';
        var commandData: ICommandData = {
            line: '',
            data: new ShuffleArray<string>([opponentName]),
            option: OptionEnum.opponent_bot,
            command: CommandEnum.settings
        };

        // act
        settingsCommand.getAnswer(commandData);

        // assert
        expect(settings[OptionEnum.opponent_bot]).toEqual(opponentName);
    });

    it('should save the starting armies to the settings when the starting_armies command is called', (): void => {
         // arrange
        var startingArmies = 6;
        var commandData: ICommandData = {
            line: '',
            data: new ShuffleArray<number>([startingArmies]),
            option: OptionEnum.starting_armies,
            command: CommandEnum.settings
        };

        // act
        settingsCommand.getAnswer(commandData);

        // assert
        expect(settings[OptionEnum.starting_armies]).toEqual(startingArmies);
    });
});
