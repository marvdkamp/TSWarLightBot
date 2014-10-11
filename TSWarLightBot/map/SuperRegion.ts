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

import ISuperRegion = require('I/ISuperRegion');

class SuperRegion implements ISuperRegion {
    id: number;
    bonus: number;
    regions: {};

    constructor(id: number, bonus: number) {
        this.id = id;
        this.bonus = bonus;
        this.regions = {};
    }
}

export = SuperRegion;