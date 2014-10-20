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

/*
 * interface for WarMap. Gives access to the mapregions.
 */
import IRegion = require('./IRegion');
import ISuperRegion = require('./ISuperRegion');
import PossibleOwnersEnum = require('../enum/PossibleOwnersEnum');

interface IWarMap {
    /*
    * returns null if region is not found
    */
    getRegionById: (id: number) => IRegion;

    /*
    * returns null if superregion is not found
    */
    getSuperRegionById: (id: number) => ISuperRegion;

    /*
    * Get all the regions owned by @owner
    * @param owner 
    */
    getOwnedRegions: (owner: PossibleOwnersEnum) => IRegion[];

    /*
    * Add a new region.
    * Overwrites existing region if a region with same the id exists. 
    */
    addRegion: (region: IRegion) => void;

    /*
    * Add a new superregion.
    * Overwrites existing region if a region with same the id exists. 
    */
    addSuperRegion: (region: ISuperRegion) => void;
}

export = IWarMap;

