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

import IWarMap = require('./interface/IWarMap');
import IRegion = require('./interface/IRegion');
import ISuperRegion = require('./interface/ISuperRegion');
import PossibleOwnersEnum = require('./enum/PossibleOwnersEnum');


interface IRegions {
    [id: number]: IRegion;
}

interface ISuperRegions {
    [id: number]: ISuperRegion;
}

class WarMap implements IWarMap {
    private regions: IRegions;
    private superRegions: ISuperRegions;

    /**
     * Create an instance of the WarMap class. Holds all the Region instances and SuperRegion instances. 
     * @constructor
     */
    constructor() {
        this.regions = {};
        this.superRegions = {};
    }

    /**
     * Returns the Region instance with the provided id.
     * @param id {number} - The id.
     * @returns {IRegion} - The Region instance.
     */
    public getRegionById(id: number): IRegion {
        if (typeof (this.regions[id]) !== 'undefined') {
            return this.regions[id];
        }
        return null;
    }

    /**
     * Returns the SuperRegion instance with the provided id.
     * @param id {number} - The id.
     * @returns {ISuperRegion} - The SuperRegion instance.
     */
    public getSuperRegionById(id: number): ISuperRegion {
        if (typeof (this.superRegions[id]) !== 'undefined') {
            return this.superRegions[id];
        }
        return null;
    }

    /**
     * Add a Region to the internal list of Region instances.
     * @param region {IRegion} - The Region instance.
     */
    public addRegion(region: IRegion): void {
        if (typeof (region) !== 'undefined') {
            this.regions[region.id] = region;
        }
    }

    /**
     * Add a Region to the internal list of SuperRegion instances.
     * @param region {ISuperRegion} - The SuperRegion instance.
     */
    public addSuperRegion(region: ISuperRegion): void {
        if (typeof (region) !== 'undefined') {
            this.superRegions[region.id] = region;
        }
    }

    /**
     * Returns a list with all the IRegion instances which are owned by the provided owner type.
     * @param owner {PossibleOwnersEnum} - The owner type.
     * @returns {IRegion[]} - The list of IRegion instances the provided owner type owns.
     */
    public getOwnedRegions(owner: PossibleOwnersEnum): IRegion[] {
        var ownedRegions = [];

        for (var i in this.regions) {
            var region = this.regions[i]; // indexer

            if (region.owner === owner) {
                ownedRegions.push(region);
            }
        }

        return ownedRegions;
    }
}

export = WarMap;