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

import IRegion = require('./interface/IRegion');
import ISuperRegion = require('./interface/ISuperRegion');
import PossibleOwnersEnum = require('./enum/PossibleOwnersEnum');

class Region implements IRegion {
    id: number;
    superRegion: ISuperRegion;
    owner: PossibleOwnersEnum;
    neighbors: IRegion[];
    troopCount: number;
    isOnEmpireBorder: boolean;
    isOnSuperRegionBorder: boolean;


    /**
     * Create an instance of the Region class. Sets properties to a default value.
     * @constructor
     * @param id {number} - The unique id for this Region.
     * @param superRegion {ISuperRegion} - Every Region instance is part of a superRegion.
     */
    constructor(id: number, superRegion: ISuperRegion) {
        this.id = id;
        this.superRegion = superRegion;
        this.owner = PossibleOwnersEnum.NEUTRAL;
        this.neighbors = [];
        this.troopCount = 2;
        this.isOnEmpireBorder = false;
        this.isOnSuperRegionBorder = false;
    }
}

export = Region;