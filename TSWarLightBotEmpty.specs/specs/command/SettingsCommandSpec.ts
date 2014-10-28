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

import IOptionSetting = require('../../../TSWarLightBotEmpty/command/interface/IOptionSetting');
import ICommandData = require('../../../TSWarLightBotEmpty/interface/ICommandData');
import OptionEnum = require('../../../TSWarLightBotEmpty/enum/OptionEnum');
import CommandEnum = require('../../../TSWarLightBotEmpty/enum/CommandEnum');
import SettingsCommand = require('../../../TSWarLightBotEmpty/command/SettingsCommand');
import ShuffleArray = require('../../../TSWarLightBotEmpty/command/helper/ShuffleArray');
import Consts = require('../../../TSWarLightBotEmpty/Consts');
import util = require('util');

describe('settingsCommand', (): void => {
    var settingsCommand: SettingsCommand;
    var settings: IOptionSetting;


    beforeEach((): void => {
        settings = {};

        settingsCommand = new SettingsCommand(settings);
    });

    // error string should be filled too.
    it('Should return Answer.succes = false in Answer.value if ICommandData.option not matches an option in settingsCommand.', (): void => {
        // arange

        // act

        // assert
    });

    it('should save the player name to the your_bot setting when the your_bot command is called', (): void => {
        // arrange

        // act

        // assert
    });

    it('should save the opponents name to the settings when the opponent_name command is called', (): void => {
        // arrange

        // act

        // assert
    });

    it('should save the starting armies to the settings when the starting_armies command is called', (): void => {
        // arrange

        // act

        // assert
    });
});
