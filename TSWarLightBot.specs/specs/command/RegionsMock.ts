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

//                  _________________
//                 | id: 3           |
//                 | owner: OPPONENT |
//                 | troopCount: 1   |
// ___________________________________________________
// | id: 2         | id: 1           | id: 4          |
// | owner: PLAYER | owner: PLAYER   | owner: NEUTRAL |
// | troopCount: 1 | troopCount: 1   | troopCount: 1  |
// |__________________________________________________|

import IRegion = require('../../../TSWarLightBot/map/interface/IRegion');
import PossibleOwnersEnum = require('../../../TSWarLightBot/map/enum/PossibleOwnersEnum');

class RegionsMock {
    public static getMock(): IRegion[] {
        var result =
            [{
                id: 1,
                superRegion: null,
                owner: PossibleOwnersEnum.PLAYER,
                neighbors: [],
                troopCount: 1,
                isOnEmpireBorder: false,
                isOnSuperRegionBorder: false
            }, {
                id: 2,
                superRegion: null,
                owner: PossibleOwnersEnum.PLAYER,
                neighbors: [],
                troopCount: 1,
                isOnEmpireBorder: false,
                isOnSuperRegionBorder: false
            }, {
                id: 3,
                superRegion: null,
                owner: PossibleOwnersEnum.OPPONENT,
                neighbors: [],
                troopCount: 1,
                isOnEmpireBorder: false,
                isOnSuperRegionBorder: false
            }, {
                id: 4,
                superRegion: null,
                owner: PossibleOwnersEnum.NEUTRAL,
                neighbors: [],
                troopCount: 1,
                isOnEmpireBorder: false,
                isOnSuperRegionBorder: false
            }];

        result[0].neighbors.push(result[1]);
        result[0].neighbors.push(result[2]);
        result[0].neighbors.push(result[3]);
        // We don't need this => Connectivity is only given in one way: 'region id' < 'neighbour id'.
        // result[1].neighbors.push(result[0]);

        return result;
    }
}

export = RegionsMock;