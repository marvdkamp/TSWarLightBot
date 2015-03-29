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

import PossibleOwnersEnum = require('../../../TSWarLightBot/map/enum/PossibleOwnersEnum');
import IWarMap = require('../../../TSWarLightBot/map/interface/IWarMap');
import IRegion = require('../../../TSWarLightBot/map/interface/IRegion');
import ISuperRegion = require('../../../TSWarLightBot/map/interface/ISuperRegion');

import SuperRegion = require('../../../TSWarLightBot/map/SuperRegion');
import Region = require('../../../TSWarLightBot/map/Region');
import WarMap = require('../../../TSWarLightBot/map/WarMap');

describe('WarMap', (): void => {
    // newed
    var warMap: IWarMap;
    // mocked
    // global
    // injected

    beforeEach((): void => {
        warMap = new WarMap();
    });

    it('Should be abble to return an added Region', (): void => {
        // arange
        warMap.addRegion(new Region(1, new SuperRegion(1, 4)));

        // act
        var result: IRegion = warMap.getRegionById(1);

        // assert
        expect(result.id).toBe(1);
    });

    it('Should return null if an Region can NOT be found', (): void => {
        // arange
        warMap.addRegion(undefined);

        // act
        var result: IRegion = warMap.getRegionById(2);

        // assert
        expect(result).toBe(null);
    });

    it('Should be abble to return an added SuperRegion', (): void => {
        // arange
        warMap.addSuperRegion(new SuperRegion(1, 4));

        // act
        var result: ISuperRegion = warMap.getSuperRegionById(1);

        // assert
        expect(result.id).toBe(1);
    });

    it('Should return null if an SuperRegion can NOT be found', (): void => {
        // arange
        warMap.addSuperRegion(undefined);

        // act
        var result: ISuperRegion = warMap.getSuperRegionById(2);

        // assert
        expect(result).toBe(null);
    });

    it('Should return every region owned by the player', (): void => {
        // arrange
        var superRegion = new SuperRegion(0, 1);
        var playerRegion1 = new Region(1, superRegion),
            playerRegion2 = new Region(2, superRegion),
            opponentRegion1 = new Region(3, superRegion),
            neutralRegion1 = new Region(4, superRegion);

        playerRegion1.owner = PossibleOwnersEnum.PLAYER;
        playerRegion2.owner = PossibleOwnersEnum.PLAYER;
        opponentRegion1.owner = PossibleOwnersEnum.OPPONENT;

        warMap.addRegion(playerRegion1);
        warMap.addRegion(playerRegion2);
        warMap.addRegion(opponentRegion1);
        warMap.addRegion(neutralRegion1);
        // act
        var owned = warMap.getOwnedRegions(PossibleOwnersEnum.PLAYER);

        // assert
        expect(owned.length).toBe(2);
        expect(owned).toContain(playerRegion1);
        expect(owned).toContain(playerRegion2);
    });
});