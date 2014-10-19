﻿/**
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
    var commandPlaceArmiesData: ICommandData = {
        line: 'go place_armies 2000',
        command: CommandEnum.go,
        subCommand: SubCommandEnum.place_armies,
        data: ['2000']
    };

    var commandAttackTransferData: ICommandData = {
        line: 'go attack/transfer 2000',
        command: CommandEnum.go,
        subCommand: SubCommandEnum.attacktransfer,
        data: ['2000']
    };

    var options: ISubCommandOption = {};
    var regions: IRegion[];
    var ownRegions: IRegion[];
    var warMap: any = jasmine.createSpyObj('warMap', ['getOwnedRegions']);
    var yourBotName: string = 'player1';

    beforeEach(() => {
        regions = createMockRegions();
        ownRegions = [];
        ownRegions.push(regions[0]);
        ownRegions.push(regions[1]);
        warMap.getOwnedRegions.andReturn(ownRegions); 
        go = new Go(options, warMap);
    });

    function createMockRegions(): IRegion[] {
        var result: IRegion[] = [{
            id: 1,
            superRegion: null,
            owner: PossibleOwners.PLAYER,
            neighbors: [],
            troopCount: 1,
            isOnEmpireBorder: false,
            isOnSuperRegionBorder: false
        }, {
            id: 2,
            superRegion: null,
            owner: PossibleOwners.PLAYER,
            neighbors: [],
            troopCount: 1,
            isOnEmpireBorder: false,
            isOnSuperRegionBorder: false
        }, {
            id: 3,
            superRegion: null,
            owner: PossibleOwners.OPPONENT,
            neighbors: [],
            troopCount: 1,
            isOnEmpireBorder: false,
            isOnSuperRegionBorder: false
        }, {
            id: 4,
            superRegion: null,
            owner: PossibleOwners.OPPONENT,
            neighbors: [],
            troopCount: 1,
            isOnEmpireBorder: false,
            isOnSuperRegionBorder: false
        }]

        result[0].neighbors.push(result[1]);
        result[0].neighbors.push(result[2]);
        result[0].neighbors.push(result[3]);
        result[1].neighbors.push(result[1]);

        return result;
    }

    it('getCommandAnswer should call right subcommand if commandPlaceArmiesData.subCommand matches.', () => {
        // arange
        spyOn(Math, 'floor').andReturn(0);
        spyOn(go, 'place_armies');

        // act
        go.getCommandAnswer(commandPlaceArmiesData);

        // assert
        expect(go.place_armies).toHaveBeenCalledWith(commandPlaceArmiesData);
        expect(go.place_armies.callCount).toBe(1);
    });

    it('getCommandAnswer should return succes = false and a error string when commandPlaceArmiesData.subCommand not matches.', () => {
        // arange
        spyOn(Math, 'floor').andReturn(0);
        commandPlaceArmiesData.subCommand = SubCommandEnum.neighbors;
        commandPlaceArmiesData.line = 'go neighbors 2000';

        // act
        var result: ICommandAnswer = go.getCommandAnswer(commandPlaceArmiesData);

        // assert
        expect(result.succes).toBeFalsy();
        expect(result.value).toBe(util.format(Messages.UNABLE_TO_EXECUTE, commandPlaceArmiesData.line));
    });

    it('getCommandAnswer should return succes = false and a error string when commandPlaceArmiesData.subCommand is undefined.', () => {
        // arange
        spyOn(Math, 'floor').andReturn(0);
        commandPlaceArmiesData.subCommand = undefined;
        commandPlaceArmiesData.line = 'go 2000';

        // act
        var result: ICommandAnswer = go.getCommandAnswer(commandPlaceArmiesData);

        // assert
        expect(result.succes).toBeFalsy();
        expect(result.value).toBe(util.format(Messages.UNABLE_TO_EXECUTE, commandPlaceArmiesData.line));
    });

    it('place_armies should call getOwnedRegions on warMap', () => {
        // arange
        spyOn(Math, 'floor').andReturn(0);

        // act
        go.place_armies(commandPlaceArmiesData);

        // assert
        expect(warMap.getOwnedRegions).toHaveBeenCalledWith(PossibleOwners.PLAYER);
        expect(warMap.getOwnedRegions.callCount).toBe(1);
    });

    it('place_armies should call Math.floor for the amount of armies it has to place', () => {
        // arange
        options[SubCommandEnum.starting_armies] = '3';
        spyOn(Math, 'floor').andReturn(0);

        // act
        go.place_armies(commandPlaceArmiesData);

        // assert
        expect(Math.floor).toHaveBeenCalledWith(2);
        expect((<jasmine.Spy>Math.floor).callCount).toBe(3);
    });

    it('place_armies should add +1 on troopCount for each armie on region found by index of Math.floor.', () => {
        // arange
        options[SubCommandEnum.starting_armies] = '3';
        spyOn(Math, 'floor').andReturn(0);

        // act
        go.place_armies(commandPlaceArmiesData);

        // assert
        expect(regions[0].troopCount).toBe(1 + 3);
    });

    // Example player1 place_armies 1 1, player1 place_armies 1 1, player1 place_armies 1 1
    // We place 3 armies all on the same Region 1 by 1 (we have only 1 region and our spy on Math.floor returns 0 every time).
    it('place_armies should return a placement for every army.', () => {
        // arange
        options[SubCommandEnum.starting_armies] = '3';
        options[SubCommandEnum.your_bot] = yourBotName;
        spyOn(Math, 'floor').andReturn(0);
        var resultOneArmie: string = [yourBotName, Answer.PLACE_ARMIES, '1 1'].join(' ');

        // act
        var result: ICommandAnswer = go.place_armies(commandPlaceArmiesData);

        // assert
        expect(result.value).toBe([resultOneArmie, resultOneArmie, resultOneArmie].join(', '));
    });

    it('attacktransfer should call getRegionsToAttack on this once', () => {
        // arange
        spyOn(go, 'getRegionsToAttack').andReturn([{
            moveFrom: regions[0],
            moveTo: regions[2]
        }]);
        spyOn(go, 'getRegionsToTransferTo').andReturn([]);

        // act
        go.attacktransfer(commandAttackTransferData);

        // assert
        expect(go.getRegionsToAttack).toHaveBeenCalledWith(ownRegions);
        expect(go.getRegionsToAttack.callCount).toBe(1);
    });

    it('attacktransfer should call getRegionsToTransferTo on this once', () => {
        // arange
        spyOn(go, 'getRegionsToAttack').andReturn([{
            moveFrom: regions[0],
            moveTo: regions[2]
        }]);
        spyOn(go, 'getRegionsToTransferTo').andReturn([]);

        // act
        go.attacktransfer(commandAttackTransferData);

        // assert
        expect(go.getRegionsToTransferTo).toHaveBeenCalledWith(ownRegions);
        expect(go.getRegionsToTransferTo.callCount).toBe(1);
    });

    it('attacktransfer should set troopsCount to 1 on moveFrom in each IMoveData result from getRegionsToAttack', () => {
        // arange
        regions[0].troopCount = 6;
        spyOn(go, 'getRegionsToAttack').andReturn([{
            moveFrom: regions[0],
            moveTo: regions[2]
        }]);
        spyOn(go, 'getRegionsToTransferTo').andReturn([]);

        // act
        go.attacktransfer(commandAttackTransferData);

        // assert
        expect(regions[0].troopCount).toBe(1);
    });

    it('attacktransfer should set troopsCount to 1 on moveFrom in each IMoveData result from getRegionsToTransferTo', () => {
        // arange
        regions[1].troopCount = 6;
        spyOn(go, 'getRegionsToTransferTo').andReturn([{
            moveFrom: regions[1],
            moveTo: regions[0]
        }]);
        spyOn(go, 'getRegionsToAttack').andReturn([]);

        // act
        go.attacktransfer(commandAttackTransferData);

        // assert
        expect(regions[1].troopCount).toBe(1);
    });

    // Example player1 attack/transfer 1 3 5, player1 attack/transfer 2 1 2
    it('attacktransfer should return a move for every IMoveData.', () => {
        // arange
        regions[0].troopCount = 6;
        spyOn(go, 'getRegionsToAttack').andReturn([{
            moveFrom: regions[0],
            moveTo: regions[2]
        }]);
        regions[1].troopCount = 3;
        spyOn(go, 'getRegionsToTransferTo').andReturn([{
            moveFrom: regions[1],
            moveTo: regions[0]
        }]);

        var resultAttackRegion: string = [yourBotName, Answer.ATTACK_TRANSFER, '1 3 5'].join(' ');
        var resultTransferRegion: string = [yourBotName, Answer.ATTACK_TRANSFER, '2 1 2'].join(' ');

        // act
        var result: ICommandAnswer = go.attacktransfer(commandAttackTransferData);

        // assert
        expect(result.value).toBe([resultAttackRegion, resultTransferRegion].join(', '));
    });
});
