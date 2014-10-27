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
 * interface for the main class of the app. Handles reading from and writing to the console.
 */

interface IBot {
    /*
     * Main entry point of the app. Attaching events to the ReadLine instance.
     */
    run: () => void;

    /*
     * Handle a incoming command from the game engine.
     * @param data {string} - a string containing a command send from the console.
     * Example handleLine('setup_map regions 1 1 2 1 3 2 4 2 5 2');
     */
    handleLine: (data: string) => void;

    /*
     * Handle a close command from the process.
     */
    handleClose: () => void;
}

export = IBot;