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
import OptionEnum = require('../../../TSWarLightBotEmpty/enum/OptionEnum');
import IOptionSetting = require('../../../TSWarLightBotEmpty/command/interface/IOptionSetting');
import ICommandData = require('../../../TSWarLightBotEmpty/interface/ICommandData');
import IAnswer = require('../../../TSWarLightBotEmpty/interface/IAnswer');
import IMoveData = require('../../../TSWarLightBotEmpty/command/interface/IMoveData');
import Consts = require('../../../TSWarLightBotEmpty/Consts');
import PossibleOwnersEnum = require('../../../TSWarLightBotEmpty/map/enum/PossibleOwnersEnum');
import IRegion = require('../../../TSWarLightBotEmpty/map/interface/IRegion');
import RegionsMock = require('./RegionsMock');
import util = require('util');
import ShuffleArray = require('../../../TSWarLightBotEmpty/command/helper/ShuffleArray');

describe('goCommand', (): void => {
    // Class for unit under test and variable for instance of unit under test.
    var GoCommand: any = require('../../../TSWarLightBotEmpty/command/GoCommand');
    var goCommand: any;

    // Mocks and spies.

    // getAnswer formuleert een antwoord op een commando van de game engine. Hij retourneerd daarvoor een IAnswer instantie. Die twee
    // properties bevat:
    // succes: Een boolean of de bot succesvol een antwoord heeft kunnen formuleren.
    // value: De string waarde die terug gestuurd moet worden naar engine of een foutmelding als succes false is.
    describe('getAnswer', (): void => {
        it('Should call place_armies method on goCommand if ICommandData.option is place_armies.', (): void => {
            // arange

            // act

            // assert
        });

        it('Should call attacktransfer method on goCommand if ICommandData.option is attacktransfer.', (): void => {
            // arange

            // act

            // assert
        });


        // error string should be filled too.
        it('Should return Answer.succes = false in Answer.value if ICommandData.option not matches any option in goCommand.', (): void => {
            // arange

            // act

            // assert
        });

        // error string should be filled too.
        it('Should return Answer.succes = false in Answer.value if ICommandData.option is undefined.', (): void => {
            // arange

            // act

            // assert
        });

        // error string should be filled too.
        it('Should return Answer.succes = false in Answer.value if ICommandData.option is null.', (): void => {
            // arange

            // act

            // assert
        });
    });

    // Het go command kent verschillende opties waaronder deze place_armies. Met place_armies geeft de bot aan de engine door op welke
    // regions de bot nieuwe troepen wil plaatsen. De bot ontvangt elke ronden een bepaalde hoeveelheid troepen.
    describe('place_armies', (): void => {

        // Should call getOwnedRegions only once and with PossibleOwnersEnum.PLAYER.
        it('Should call getOwnedRegions on warMap', (): void => {
            // arange

            // act

            // assert
        });

        // settings gets injected and holds OptionEnum.starting_armies.
        it('Should call Math.random for the amount of armies it has to place OptionEnum.starting_armies', (): void => {
            // arange

            // act

            // assert
        });

        // regions are part of the warmap which gets injected in the goCommand instance.
        it('Should add +1 on troopCount the region found by index of Math.random.', (): void => {
            // arange

            // act

            // assert
        });

        // Example player1 place_armies 1 1, player1 place_armies 1 1, player1 place_armies 1 1
        // We place 3 armies all on the region found by index of Math.random. Each armie will be placed induvidualy.
        it('Should return a placement for every army.', (): void => {
            // arange

            // act

            // assert
        });
    });

    // Het go command kent verschillende opties waaronder deze attacktransfer. Met attacktransfer geeft de bot aan de engine door 
    // welke troepen de bot wil verplaatsen van eigen regions en welke vijandelijk regions hij wil aanvallen en met hoeveel troepen.
    describe('attacktransfer', (): void => {

        // Should call getRegionsToAttackTransfer once with own false and MINIMUM_TROOPS_FOR_ATTACK and
        // once with own true and MINIMUM_TROOPS_FOR_TRANSFER.
        it('Should call getRegionsToAttackTransfer on goCommand twice', (): void => {
            // arange

            // act

            // assert
        });

        // We always move all troops but 1.
        // The troopCount on the region we test on should be atleast Consts.MINIMUM_TROOPS_FOR_TRANSFER.
        // Create a spyOn for getRegionsToAttackTransfer on goCommand to control returned IMoveData and only return an arry for own=false
        // regionFrom is part of the IMove instance returned by getRegionsToAttackTransfer.
        it('Should set troopsCount to 1 on regionFrom result from getRegionsToAttackTransfer with argument own=false', (): void => {
            // arange

            // act

            // assert
        });

        // We always move all troops but 1.
        // The troopCount on the region we test on should be atleast Consts.MINIMUM_TROOPS_FOR_ATTACK.
        // Create a spyOn for getRegionsToAttackTransfer on goCommand to control returned IMoveData and only return an arry for own=true
        // regionFrom is part of the IMove instance returned by getRegionsToAttackTransfer.
        it('Should set troopsCount to 1 on regionFrom from getRegionsToAttackTransfer result for an attack', (): void => {
            // arange

            // act

            // assert
        });

        // Example player1 attack/transfer 1 3 5, player1 attack/transfer 2 1 2
        // Create a spyOn for getRegionsToAttackTransfer on goCommand and return 
        // both a region for an attack and a region for a transfer.
        it('Should return a move for every IMoveData.', (): void => {
            // arange

            // act

            // assert
        });

        // Should return an No moves string. 
        // Create a spyOn for getRegionsToAttackTransfer on goCommand and return not one region.
        it('should not return moves if no regions are returned by getRegionsToAttackTransfer', (): void => {
            // arange

            // act

            // assert
        });
    });

    describe('getRegionsToAttackTransfer', (): void => {
        // Neigbors which are NOT owned (own paramter is false)..
        // For regions with a troopcount >= Consts.MINIMUM_TROOPS_FOR_ATTACK.
        // regions[index] in which index is determind with Math.random.
        it('Should return correct regions for attack.', (): void => {
            // arange

            // act

            // assert
        });

        // Neigbors which are owned (own paramter is true).
        // For regions with a troopcount >= Consts.MINIMUM_TROOPS_FOR_TRANSFER.
        // regions[index] in which index is determind with Math.random.
        it('Should return correct regions for transfer.', (): void => {
            // arange

            // act

            // assert
        });
    });
});
