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
 * Some commands from the game engie are split up in two parts. These are those second parts.
 */
enum OptionEnum {
    /*
     * The superregions are given. Will be preceded with setup_map.
     */
    super_regions,

    /*
     * The regions are given. Will be preceded with setup_map.
     */
    regions,

    /*
     * The connectivity of the regions are given. Will be preceded with setup_map.
     */
    neighbors,

    /*
     * The name of your bot is given. Will be preceded with settings.
     */
    your_bot,

    /*
     * The name of your opponent bot is given. Will be preceded with settings.
     */
    opponent_bot,

    /*
     * the amount of armies your bot can place on  the map at the start of this round. Will be preceded with settings.
     */
    starting_armies,

    /**
     * Request for the bot to return his place armies moves. Will be preceded with go.
     */
    place_armies,

    /*
     * Request for the bot to return his attack and/or transfer moves. Will be preceded with go.
     */
    attacktransfer
}

export = OptionEnum;