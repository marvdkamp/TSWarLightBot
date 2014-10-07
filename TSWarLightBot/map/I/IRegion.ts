﻿/**
 * Warlight AI Game Bot
 *
 * Oktober 2014
 *
 * Based on Niko van Meurs javascript bot from http://theaigames.com/competitions/warlight-ai-challenge/getting-started
 *
 * @authors Marcel van der Kamp and Taeke van der Veen
 * @License MIT License (http://opensource.org/Licenses/MIT)
 */

/**
 * interface of a Region Object.
 */
import ISuperRegion = require('ISuperRegion');
import PossibleOwners = require('../PossibleOwners');

interface IRegion {
    id: number;
    superRegion: ISuperRegion;
    owner: PossibleOwners;
    neighbors: IRegion[];
    troopCount: number;
    isOnEmpireBorder: boolean;
    isOnSuperRegionBorder: boolean;
}

export = IRegion;