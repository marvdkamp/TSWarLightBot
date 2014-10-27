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
 * The dfferent commands the game engine wil send to the bot.
 */
enum CommandEnum {

    /*
     * The regions are given, The superregions are given and the connectivity of the regions are given in different calls.
     * Example: setup_map super_regions 1 2 2 5
     */
    setup_map,

    /*
     * Starting regions to be chosen from are given, request to return 6 region ids.
     * Example: pick_starting_regions 2000 1 7 12 13 18 15 24 25 29 37 42 41
     * Answer: 1 7 24 25 41 42
     */
    pick_starting_regions,

    /*
     * The name of your bot is given, the name of your opponent bot is given and the amount of armies your bot can place on 
     * the map at the start of this round
     * Example: settings your_bot player1
     */
    settings,

    /*
     * Visible map for the bot is given like this: region id; player owning region; number of armies.
     * Example: update_map 1 neutral 2 4 player2 5 5 neutral 2
     */
    update_map,

    /*
     * All the visible moves the opponent has done are given in consecutive order.
     */
    opponent_moves,

    /*
     * Request for the bot to return his place armies moves and request for the bot to return his attack and/or transfer moves.
     * Example: go place_armies 2000
     * Answer: player1 place_armies 1 2, player1 place_armies 2 5
     */
    go
}

export = CommandEnum;
