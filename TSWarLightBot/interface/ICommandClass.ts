﻿/*
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

import ICommand = require('./../command/interface/ICommand');

/*
 * Couples a command to a method which will handle the command.
 */
interface ICommandClass {

    /*
     * The given command fromm the game engine and the method to handle it.
     * We can't us an enum as indexer. So we use number but you hould read CommandEnum.
     */
    [command: number /*CommandEnum*/ ]: ICommand;
}

export = ICommandClass;