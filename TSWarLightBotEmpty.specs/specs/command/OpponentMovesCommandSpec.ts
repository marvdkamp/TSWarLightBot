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
/// <reference path="../../Scripts/typings/jasmine/legacy/jasmine-1.3.d.ts" />
'use strict';

import CommandEnum = require('../../../TSWarLightBotEmpty/enum/CommandEnum');
import ICommandData = require('../../../TSWarLightBotEmpty/interface/ICommandData');
import IAnswer = require('../../../TSWarLightBotEmpty/interface/IAnswer');
import ShuffleArray = require('../../../TSWarLightBotEmpty/command/helper/ShuffleArray');

describe('opponentMovesCommand', (): void => {
    var OpponentMovesCommand: any = require('../../../TSWarLightBotEmpty/command/OpponentMovesCommand');
    var opponentMovesCommand: any;

    // Mocks and spies.
    var commandDataMock: ICommandData;

    beforeEach((): void => {
        // Creeer de unit under test en injecteer de mock en spy.
        opponentMovesCommand = new OpponentMovesCommand();
    });


    describe('getAnswer', (): void => {
        it('Should return IAnwser.succes is true and a empty value', (): void => {
            // arrange

            // act

            // assert
        });
    });
});
