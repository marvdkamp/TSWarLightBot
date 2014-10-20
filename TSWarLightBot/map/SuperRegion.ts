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

import ISuperRegion = require('./interface/ISuperRegion');

class SuperRegion implements ISuperRegion {
    id: number;
    bonus: number;
    regions: {};

    /*
     * Create an instance of the SuperRegion class. 
     * @constructor
     * @param id {number} - The unique id for this SuperRegion.
     * @param bonus {number} - A bot which owns every Region of this Superregion instance gets this amount of bonus troops.
     */
    constructor(id: number, bonus: number) {
        this.id = id;
        this.bonus = bonus;
        this.regions = {};
    }
}

export = SuperRegion;