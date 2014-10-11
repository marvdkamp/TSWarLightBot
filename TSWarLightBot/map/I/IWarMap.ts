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

/**
 * interface for WarMap. Gives access to the mapregions.
 */
import IRegion = require('IRegion');
import PossibleOwners = require('../PossibleOwners');

interface IWarMap {
    /*
    * returns null if region is not found
    */
    getRegionById: (id: number) => IRegion;

    /*
    * returns null if region is not found
    */
    getSuperRegionById: (id: number) => IRegion;


    getOwnedRegions: (owner: PossibleOwners) => IRegion[];
}

export = IWarMap;

