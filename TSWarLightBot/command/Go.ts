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
import ICommand = require('./ICommand');
import ISubCommandOption = require('./ISubCommandOption');
import ISubCommandMethod = require('./ISubCommandMethod');
import ICommandAnswer = require('./../ICommandAnswer');
import ICommandData = require('./../ICommandData');
import CommandEnum = require('../CommandEnum');
import SubCommandEnum = require('../SubCommandEnum');
import IWarMap = require('../map/I/IWarMap');
import IRegion = require('../map/I/IRegion');
import PossibleOwners = require('../map/PossibleOwners');
import _ = require('underscore');
import Messages = require('../Messages');
import util = require('util');

/**
 * Handles go command from the game engine. Request for the bot to return his place armies moves  and request for the bot 
 * to return his attack and/or transfer moves.
 */
class Go implements ICommand {
    private subCommandMethodList: ISubCommandMethod[] = [];

    constructor(private options: ISubCommandOption[], private warMap: IWarMap) {
        this.subCommandMethodList.push({
            subCommand: SubCommandEnum.place_armies,
            method: (commandData: ICommandData) => { 
                return this.place_armies(commandData)
            }
        });
    } 

    /**
     * Gets the answer from the bot for the go command.
     * @param data {ICommandData} - Information about the command.
     * @returns {ICommandData} - The command answer.
     * Example: 
     * getCommandAnswer({ 
     *     line: 'go place_armies 2000'
     *     command: CommandEnum.go,
     *     subCommand: SubCommandEnum.place_armies,
     *     data: ['2000']
     * });
     */
    public getCommandAnswer(commandData: ICommandData): ICommandAnswer {
        var subCommandMethod: ISubCommandMethod = _.find(this.subCommandMethodList, (subCommandMethod: ISubCommandMethod) => {
            return subCommandMethod.subCommand === commandData.subCommand;
        });

        if (subCommandMethod && !(subCommandMethod.method == null)) {
            return subCommandMethod.method(commandData);
        } else {
            return {
                succes: false,
                value: util.format(Messages.UNABLE_TO_EXECUTE, commandData.line)
            }
        }
    }

    public place_armies(commandData: ICommandData): ICommandAnswer {
        var ownedRegions: IRegion[] = this.warMap.getOwnedRegions(PossibleOwners.PLAYER);
        return null;
    }
}

export = Go;