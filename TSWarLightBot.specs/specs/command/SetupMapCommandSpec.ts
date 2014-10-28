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
import OptionEnum = require('../../../TSWarLightBot/enum/OptionEnum');
import ICommandData = require('../../../TSWarLightBot/interface/ICommandData');
import IAnswer = require('../../../TSWarLightBot/interface/IAnswer');
import IRegion = require('../../../TSWarLightBot/map/interface/IRegion');
import ISuperRegion = require('../../../TSWarLightBot/map/interface/ISuperRegion');
import ShuffleArray = require('../../../TSWarLightBot/command/helper/ShuffleArray');
import Consts = require('../../../TSWarLightBot/Consts');
import util = require('util');

describe('setupMapCommand', (): void => {
    // Class for unit under test and variable for instance of unit under test.
    var SetupMapCommand: any = require('../../../TSWarLightBot/command/SetupMapCommand');
    var setupMapCommand: any;

    // Mocks and spies.
    var commandDataMock: ICommandData;
    var warMapSpy: any;

    beforeEach((): void => {
        warMapSpy = jasmine.createSpyObj('warMap', ['addRegion', 'addSuperRegion', 'getSuperRegionById', 'getRegionById']);

        // Creeer de unit under test en injecteer de mock en spy.
        setupMapCommand = new SetupMapCommand(warMapSpy);
    });

    describe('getAnswer', (): void => {
        beforeEach((): void => {
            commandDataMock = {
                line: 'setup_map regions 1 1 2 1 3 2 4 2 5 2',
                command: CommandEnum.setup_map,
                option: OptionEnum.regions,
                data: new ShuffleArray<string>(['1', '1', '2', '1', '3', '2', '4', '2', '5', '2'])
            };
        });

        it('Should call regions method on setupMapCommand if ICommandData.option is regions.', (): void => {
            // arange
            spyOn(setupMapCommand, 'regions');

            // act
            setupMapCommand.getAnswer(commandDataMock);

            // assert
            expect(setupMapCommand.regions).toHaveBeenCalledWith(commandDataMock);
            expect(setupMapCommand.regions.callCount).toBe(1);
        });

        it('Should call super_regions method on setupMapCommand if ICommandData.option is super_regions.', (): void => {
            // arange
            commandDataMock = {
                line: 'setup_map super_regions 1 2 2 5',
                command: CommandEnum.setup_map,
                option: OptionEnum.super_regions,
                data: new ShuffleArray<string>(['1', '2', '2', '5'])
            };
            spyOn(setupMapCommand, 'super_regions');

            // act
            setupMapCommand.getAnswer(commandDataMock);

            // assert
            expect(setupMapCommand.super_regions).toHaveBeenCalledWith(commandDataMock);
            expect(setupMapCommand.super_regions.callCount).toBe(1);
        });

        it('Should call neighbors method on setupMapCommand if ICommandData.option is neighbors.', (): void => {
            // arange
            commandDataMock = {
                line: 'setup_map neighbors 1 2,3,4 2 3 4 5',
                command: CommandEnum.setup_map,
                option: OptionEnum.neighbors,
                data: new ShuffleArray<string>(['1', '2,3,4', '2', '3', '4', '5'])
            };
            spyOn(setupMapCommand, 'neighbors');

            // act
            setupMapCommand.getAnswer(commandDataMock);

            // assert
            expect(setupMapCommand.neighbors).toHaveBeenCalledWith(commandDataMock);
            expect(setupMapCommand.neighbors.callCount).toBe(1);
        });

        // error string should be filled too.
        it('Should return Answer.succes = false if ICommandData.option not matches any option in setupMapCommand.', (): void => {
            // arange
            commandDataMock.option = OptionEnum.place_armies;
            commandDataMock.line = 'setup_map place_armies 1 1 2 1 3 2 4 2 5 2';

            // act
            var result: IAnswer = setupMapCommand.getAnswer(commandDataMock);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandDataMock.line));
        });

        // error string should be filled too.
        it('Should return Answer.succes = false in Answer.value if ICommandData.option is undefined.', (): void => {
            // arange
            commandDataMock.option = undefined;
            commandDataMock.line = 'setup_map 1 1 2 1 3 2 4 2 5 2';

            // act
            var result: IAnswer = setupMapCommand.getAnswer(commandDataMock);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandDataMock.line));
        });

        // error string should be filled too.
        it('Should return Answer.succes = false in Answer.value if ICommandData.option is null.', (): void => {
            // arange
            commandDataMock.option = null;
            commandDataMock.line = 'setup_map 1 1 2 1 3 2 4 2 5 2';

            // act
            var result: IAnswer = setupMapCommand.getAnswer(commandDataMock);

            // assert
            expect(result.succes).toBeFalsy();
            expect(result.value).toBe(util.format(Consts.UNABLE_TO_EXECUTE, commandDataMock.line));
        });
    });

    // Het setup_map command kent verschillende opties waaronder deze regions. Met regions geeft de engine welke regions
    // er allemaal bestaan op de warMap.
    describe('regions', (): void => {
        beforeEach((): void => {
            commandDataMock = {
                line: 'setup_map regions 1 1 2 1 3 2 4 2 5 2',
                command: CommandEnum.setup_map,
                option: OptionEnum.regions,
                data: new ShuffleArray<string>(['1', '1', '2', '1', '3', '2', '4', '2', '5', '2'])
            };
        });

        // Every two numbers in data stand for one region and the superregion it is attached to in that order.
        // It should call addRegion for the amount of numbers in data devided by two.
        // It should call it with an IRegion instance with the right region id and superregion id.
        it('Should call addRegion on warMap.', (): void => {
            // arange
            warMapSpy.getSuperRegionById.andCallFake((id: number) : any => {
                return {
                    id: id
                };
            });

            var result: IRegion[] = [];

            warMapSpy.addRegion.andCallFake((region: IRegion): void => {
                result.push(region);
            });

            // act
            setupMapCommand.regions(commandDataMock);

            // assert
            expect(result.length).toBe(5);
            expect(result[0].id).toBe(1);
            expect(result[0].superRegion.id).toBe(1);
            expect(result[4].id).toBe(5);
            expect(result[4].superRegion.id).toBe(2);
        });

        it('Should return IAnwser.succes is true and a empty value', (): void => {
            // arrange

            // act
            var result: IAnswer = setupMapCommand.regions(commandDataMock);

            // assert
            expect(result.succes).toBeTruthy();
            expect(result.value).toBe('');
        });
    });

    // Het setup_map command kent verschillende opties waaronder deze super_regions. Met super_regions geeft de engine welke super_regions
    // er allemaal bestaan op de warMap.
    describe('super_regions', (): void => {
        beforeEach((): void => {
            commandDataMock = {
                line: 'setup_map super_regions 1 2 2 5',
                command: CommandEnum.setup_map,
                option: OptionEnum.super_regions,
                data: new ShuffleArray<string>(['1', '2', '2', '5'])
            };
        });

        // Every two numbers in data stand for one super_region and the bonus the player receives every round for owning it.
        // It should call addSuperRegion for the amount of numbers in data devided by two.
        // It should call it with an ISuperRegion instance with the right superregion id and bonus.
        it('Should call addSuperRegion on warMap.', (): void => {
            // arange
            var result: ISuperRegion[] = [];

            warMapSpy.addSuperRegion.andCallFake((superRegion: ISuperRegion): void => {
                result.push(superRegion);
            });

            // act
            setupMapCommand.super_regions(commandDataMock);

            // assert
            expect(result.length).toBe(2);
            expect(result[0].id).toBe(1);
            expect(result[0].bonus).toBe(2);
            expect(result[1].id).toBe(2);
            expect(result[1].bonus).toBe(5);
        });

        it('Should return IAnwser.succes is true and a empty value', (): void => {
            // arrange

            // act
            var result: IAnswer = setupMapCommand.super_regions(commandDataMock);

            // assert
            expect(result.succes).toBeTruthy();
            expect(result.value).toBe('');
        });
    });

    // Het setup_map command kent verschillende opties waaronder deze neighbors. Met neighbors geeft de engine welke regions have 
    // which neigbors.
    describe('neighbors', (): void => {
        beforeEach((): void => {
            commandDataMock = {
                line: 'setup_map neighbors 1 2,3,4 2 3 4 5',
                command: CommandEnum.setup_map,
                option: OptionEnum.neighbors,
                data: new ShuffleArray<string>(['1', '2,3,4', '2', '3', '4', '5'])
            };
        });

        // Hij moet dus 8 keer getRegionById aanroepen met deze commandDataMock.
        it('Should call getRegionById for every region in the list.', (): void => {
            // arrange

            // act
            setupMapCommand.neighbors(commandDataMock);

            // assert
            expect(warMapSpy.getRegionById.callCount).toBe(8);
        });
    });
});
