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

import CommandEnum = require('../../../TSWarLightBot/enum/CommandEnum');
import ICommandData = require('../../../TSWarLightBot/interface/ICommandData');
import IAnswer = require('../../../TSWarLightBot/interface/IAnswer');
import ShuffleArray = require('../../../TSWarLightBot/command/helper/ShuffleArray');

describe('opponentMovesCommand', (): void => {
    var OpponentMovesCommand: any = require('../../../TSWarLightBot/command/OpponentMovesCommand');
    var opponentMovesCommand: any;

    // Mocks and spies.
    var commandDataMock: ICommandData;

    beforeEach((): void => {
        // Creeer de unit under test en injecteer de mock en spy.
        opponentMovesCommand = new OpponentMovesCommand();
    });


    describe('getAnswer', (): void => {
        beforeEach((): void => {
            commandDataMock = {
                line: 'opponent_moves',
                command: CommandEnum.opponent_moves,
                option: undefined,
                data: new ShuffleArray<string>([])
            };
        });

        it('Should return IAnwser.succes is true and a empty value', (): void => {
            // arrange

            // act
            var result: IAnswer = opponentMovesCommand.getAnswer(commandDataMock);

            // assert
            expect(result.succes).toBeTruthy();
            expect(result.value).toBe('');
        });
    });
});
