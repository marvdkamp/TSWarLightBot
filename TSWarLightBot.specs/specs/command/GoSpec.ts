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
import Answer = require('../../../TSWarLightBot/command/Answer');
import Messages = require('../../../TSWarLightBot/Messages');
import PossibleOwners = require('../../../TSWarLightBot/map/PossibleOwners');
import IRegion = require('../../../TSWarLightBot/map/I/IRegion');
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

    var options: ISubCommandOption = {};
    var region: IRegion;
    var warMap: any = jasmine.createSpyObj('warMap', ['getOwnedRegions']);
    var yourBotName: string = 'player1';

    beforeEach(() => {
        region = {
            id: 1,
            superRegion: null,
            owner: null,
            neighbors: null,
            troopCount: 0,
            isOnEmpireBorder: false,
            isOnSuperRegionBorder: false
        }; 
        warMap.getOwnedRegions.andReturn([region]); 
        go = new Go(options, warMap);
    });

    it('getCommandAnswer should call right subcommand if commandData.subCommand matches.', () => {
        // arange
        spyOn(Math, 'floor').andReturn(0);
        spyOn(go, 'place_armies');

        // act
        go.getCommandAnswer(commandData);

        // assert
        expect(go.place_armies).toHaveBeenCalledWith(commandData);
        expect(go.place_armies.callCount).toBe(1);
    });

    it('getCommandAnswer should return succes = false and a error string when commandData.subCommand not matches.', () => {
        // arange
        spyOn(Math, 'floor').andReturn(0);
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
        spyOn(Math, 'floor').andReturn(0);
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
        spyOn(Math, 'floor').andReturn(0);

        // act
        go.place_armies(commandData);

        // assert
        expect(warMap.getOwnedRegions).toHaveBeenCalledWith(PossibleOwners.PLAYER);
        expect(warMap.getOwnedRegions.callCount).toBe(1);
    });

    it('place_armies should call Math.floor for the amount of armies it has to place', () => {
        // arange
        options[SubCommandEnum.starting_armies] = '3';
        spyOn(Math, 'floor').andReturn(0);

        // act
        go.place_armies(commandData);

        // assert
        expect(Math.floor).toHaveBeenCalledWith(1);
        expect((<jasmine.Spy>Math.floor).callCount).toBe(3);
    });

    it('place_armies should add +1 on troopCount for each armie on region found by index of Math.floor.', () => {
        // arange
        options[SubCommandEnum.starting_armies] = '3';
        spyOn(Math, 'floor').andReturn(0);

        // act
        go.place_armies(commandData);

        // assert
        expect(region.troopCount).toBe(3);
    });

    // Example player1 place_armies 1 1, player1 place_armies 1 1, player1 place_armies 1 1
    // We place 3 armies all on the same Region 1 by 1 (we have only 1 region and our spy on Math.floor returns 0 every time).
    it('place_armies should return the a placement for every army.', () => {
        // arange
        options[SubCommandEnum.starting_armies] = '3';
        options[SubCommandEnum.your_bot] = yourBotName;
        spyOn(Math, 'floor').andReturn(0);
        var resultOneArmie: string = [yourBotName, Answer.PLACE_ARMIES, '1 1'].join(' ');

        // act
        var result: ICommandAnswer = go.place_armies(commandData);

        // assert
        expect(result.value).toBe([resultOneArmie, resultOneArmie, resultOneArmie].join(', '));
    });

    it('attacktransfer should call getRegionsToAttack on this once', () => {
        // arange
        spyOn(go, 'getRegionsToAttack').andReturn([{
            moveFrom: region
        }]);

        // act
        go.attacktransfer(commandData);

        // assert
        expect(go.getRegionsToAttack).toHaveBeenCalledWith([region]);
        expect(go.getRegionsToAttack.callCount).toBe(1);
    });

    it('attacktransfer should call getRegionsToTransferTo on this once', () => {
        // arange
        spyOn(go, 'getRegionsToAttack').andReturn([{
            moveFrom: region
        }]);
        spyOn(go, 'getRegionsToTransferTo');

        // act
        go.attacktransfer(commandData);

        // assert
        expect(go.getRegionsToTransferTo).toHaveBeenCalledWith([region]);
        expect(go.getRegionsToTransferTo.callCount).toBe(1);
    });

    it('attacktransfer should set troopsCount to 1 on moveFrom in each IMove result from getRegionsToAttack', () => {
        // arange
        region.troopCount = 4;
        spyOn(go, 'getRegionsToAttack').andReturn([{
            moveFrom: region
        }]);

        // act
        go.attacktransfer(commandData);

        // assert
        expect(region.troopCount).toBe(1);
    });
});
