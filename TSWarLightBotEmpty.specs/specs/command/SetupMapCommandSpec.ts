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
import ICommandData = require('../../../TSWarLightBotEmpty/interface/ICommandData');
import IAnswer = require('../../../TSWarLightBotEmpty/interface/IAnswer');
import IRegion = require('../../../TSWarLightBotEmpty/map/interface/IRegion');
import ISuperRegion = require('../../../TSWarLightBotEmpty/map/interface/ISuperRegion');
import ShuffleArray = require('../../../TSWarLightBotEmpty/command/helper/ShuffleArray');
import Consts = require('../../../TSWarLightBotEmpty/Consts');
import util = require('util');

describe('setupMapCommand', (): void => {
    // Class for unit under test and variable for instance of unit under test.
    var SetupMapCommand: any = require('../../../TSWarLightBotEmpty/command/SetupMapCommand');
    var setupMapCommand: any;

    describe('getAnswer', (): void => {
        it('Should call regions method on setupMapCommand if ICommandData.option is regions.', (): void => {
            // arange

            // act

            // assert
        });

        it('Should call super_regions method on setupMapCommand if ICommandData.option is super_regions.', (): void => {
            // arange

            // act

            // assert
        });

        it('Should call neighbors method on setupMapCommand if ICommandData.option is neighbors.', (): void => {
            // arange

            // act

            // assert
        });


        // error string should be filled too.
        it('Should return Answer.succes = false if ICommandData.option not matches any option in setupMapCommand.', (): void => {
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

    // Het setup_map command kent verschillende opties waaronder deze regions. Met regions geeft de engine welke regions
    // er allemaal bestaan op de warMap.
    describe('regions', (): void => {

        // Every two numbers in data stand for one region and the superregion it is attached to in that order.
        // It should call addRegion for the amount of numbers in data devided by two.
        // It should call it with an IRegion instance with the right region id and superregion id.
        it('Should call addRegion on warMap.', (): void => {
            // arange

            // act

            // assert
        });

        it('Should return IAnwser.succes is true and a empty value', (): void => {
            // arrange

            // act

            // assert
        });
    });

    // Het setup_map command kent verschillende opties waaronder deze super_regions. Met super_regions geeft de engine welke super_regions
    // er allemaal bestaan op de warMap.
    describe('super_regions', (): void => {
        // Every two numbers in data stand for one super_region and the bonus the player receives every round for owning it.
        // It should call addSuperRegion for the amount of numbers in data devided by two.
        // It should call it with an ISuperRegion instance with the right superregion id and bonus.
        it('Should call addSuperRegion on warMap.', (): void => {
            // arange

            // act

            // assert
        });

        it('Should return IAnwser.succes is true and a empty value', (): void => {
            // arrange

            // act

            // assert
        });
    });

    // Het setup_map command kent verschillende opties waaronder deze neighbors. Met neighbors geeft de engine welke regions have 
    // which neigbors.
    describe('neighbors', (): void => {
        // Hij moet dus 8 keer getRegionById aanroepen met deze commandDataMock.
        it('Should call getRegionById for every region in the list.', (): void => {
            // arrange

            // act

            // assert
        });
    });
});
