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
/// <reference path="../../Scripts/typings/jasmine/legacy/jasmine-1.3.d.ts" />

import CommandEnum = require('../../../TSWarLightBot/CommandEnum');
import SubCommandEnum = require('../../../TSWarLightBot/SubCommandEnum');
import ICommand = require('../../../TSWarLightBot/command/ICommand');
import ICommandData = require('../../../TSWarLightBot/ICommandData');

describe('go.test', () => {
    var Go: any = require("../../../TSWarLightBot/command/Go");
    var go: ICommand;
    var place_armiesMethod: any = jasmine.createSpy('place_armiesMethod');
    var place_armiesSubCommandMethod: any = jasmine.createSpy('place_armiesSubCommandMethod');
    var commandData: ICommandData = {
        command: CommandEnum.go,
        subCommand: SubCommandEnum.place_armies,
        data: ['2000']
    };


    beforeEach(() => {
        place_armiesSubCommandMethod.command = SubCommandEnum.place_armies;
        place_armiesSubCommandMethod.method = place_armiesMethod;
        go = new Go([place_armiesSubCommandMethod]);
    });

    it('getCommandAnswer should call right subcommand if commandData.command matches.', () => {
        // arange

        // act
        go.getCommandAnswer(commandData);

        // assert
        expect(place_armiesMethod).toHaveBeenCalled();
    });
});
