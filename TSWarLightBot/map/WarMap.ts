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
'use strict';

import IWarMap = require('./I/IWarMap');
import IRegion = require('./I/IRegion');
import ISuperRegion = require('I/ISuperRegion');
import PossibleOwners = require('./PossibleOwners');


interface IRegions {
    [id: number]: IRegion;
}

interface ISuperRegions {
    [id: number]: ISuperRegion;
}

class WarMap implements IWarMap {
    private regions: IRegions;
    private superRegions: ISuperRegions;

    constructor() {
        this.regions = {};
        this.superRegions = {};
    }

    public getRegionById(id: number): IRegion {
        if (typeof (this.regions[id]) !== 'undefined')
            return this.regions[id];

        return null;
    }

    public getSuperRegionById(id: number): ISuperRegion {
        if (typeof (this.superRegions[id]) !== 'undefined')
            return this.superRegions[id];

        return null;
    }

    public addRegion(region: IRegion): void {
        if(typeof(region) !== 'undefined')
            this.regions[region.id] = region;
    }

    public addSuperRegion(region: ISuperRegion): void {
        if (typeof (region) !== 'undefined')
            this.superRegions[region.id] = region;
    }

    public getOwnedRegions(owner: PossibleOwners): IRegion[] {
        var ownedRegions = [];

        for (var i in this.regions) {
            var region = this.regions[i];

            if (region.owner === owner) {
                ownedRegions.push(region);
            }
        }

        return ownedRegions;
    }
}

export = WarMap;