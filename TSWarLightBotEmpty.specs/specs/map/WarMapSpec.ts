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

import PossibleOwnersEnum = require('../../../TSWarLightBotEmpty/map/enum/PossibleOwnersEnum');
import IWarMap = require('../../../TSWarLightBotEmpty/map/interface/IWarMap');

import SuperRegion = require('../../../TSWarLightBotEmpty/map/SuperRegion');
import Region = require('../../../TSWarLightBotEmpty/map/Region');
import WarMap = require('../../../TSWarLightBotEmpty/map/WarMap');

describe('WarMap', (): void => {
    // newed
    var warMap: IWarMap;
    // mocked
    // global
    // injected

    beforeEach((): void => {
        warMap = new WarMap();
    });

    // todo: alleen maar getters en setters in WarMap. zouden gehit moeten worden door andere tests,
    // niet specifieke tests voor geschreven worden.
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