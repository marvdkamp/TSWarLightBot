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
'use strict';

import CommandEnum = require('../../../TSWarLightBot/CommandEnum');
import SubCommandEnum = require('../../../TSWarLightBot/SubCommandEnum');
import ICommand = require('../../../TSWarLightBot/command/ICommand');
import ISubCommandOption = require('../../../TSWarLightBot/command/ISubCommandOption');
import ICommandData = require('../../../TSWarLightBot/ICommandData');
import ICommandAnswer = require('../../../TSWarLightBot/ICommandAnswer');
import Messages = require('../../../TSWarLightBot/Messages');
import PossibleOwners = require('../../../TSWarLightBot/map/PossibleOwners');
import util = require('util');

describe('go.test', () => {
    var Go: any = require("../../../TSWarLightBot/command/Go");
    var go: any;
    var commandData: ICommandData = {
        line: 'go place_armies 2000',
        command: CommandEnum.go,
        subCommand: SubCommandEnum.place_armies,
        data: ['2000']
    };

    var options: ISubCommandOption[] = [{
        subCommand: SubCommandEnum.starting_armies,
        value: '0'
    }];

    var warMap: any = jasmine.createSpyObj('warMap', ['getOwnedRegions']); 

    beforeEach(() => {5
        go = new Go(options, warMap);
    });

    it('getCommandAnswer should call right subcommand if commandData.subCommand matches.', () => {
        // arange
        spyOn(go, 'place_armies');

        // act
        go.getCommandAnswer(commandData);

        // assert
        expect(go.place_armies).toHaveBeenCalledWith(commandData);
        expect(go.place_armies.callCount).toBe(1);
    });

    it('getCommandAnswer should return succes = false and a error string when commandData.subCommand not matches.', () => {
        // arange
        commandData.subCommand = SubCommandEnum.neighbors;
        commandData.line = 'go neighbors 2000';

        // act
        var result: ICommandAnswer = go.getCommandAnswer(commandData);

        // assert
        expect(result.succes).toBeFalsy();
        expect(result.value).toBe(util.format(Messages.UNABLE_TO_EXECUTE, commandData.line));
    });

    it('getCommandAnswer should return succes = false and a error string when commandData.subCommand is undefined.', () => {
        // arange
        commandData.subCommand = undefined;
        commandData.line = 'go 2000';

        // act
        var result: ICommandAnswer = go.getCommandAnswer(commandData);

        // assert
        expect(result.succes).toBeFalsy();
        expect(result.value).toBe(util.format(Messages.UNABLE_TO_EXECUTE, commandData.line));
    });

    it('place_armies should call getOwnedRegions on warMap', () => {
        // arange

        // act
        go.place_armies(commandData);

        // assert
        expect(warMap.getOwnedRegions).toHaveBeenCalledWith(PossibleOwners.PLAYER);
        expect(warMap.getOwnedRegions.callCount).toBe(1);
    });

    it('place_armies should call Math.floor for the amount of armies it has to place', () => {
        // arange
        options[0].value = '3';
        warMap.getOwnedRegions.andReturn([]);
        spyOn(Math, 'floor');

        // act
        go.place_armies(commandData);

        // assert
        expect(Math.floor).toHaveBeenCalledWith(0);
        expect((<jasmine.Spy>Math.floor).callCount).toBe(3);
    });
});
