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

// Based on http://stackoverflow.com/questions/14000645/how-to-extend-native-javascipt-array-in-typescript

// A dummy class to inherite array.
class DummyArray<T> {
    constructor() {
        Array.apply(this);
        return new Array<T>();
    }

    // We need this, or TS will show an error,
    // DummyArray["prototype"] = new Array(); will replace with native js arrray function
    pop(): any {
        return '';
    }

    push(val: any): number {
        return 0;
    }

    shift(): any {
        return null;
    }

    unshift(value: any): any {
        return null;
    }

    slice(begin: number, end: number): any {
        return null;
    }

    forEach(callBack: (element: any, index?: number, array?: DummyArray<T>) => void): any {
        return null;
    }

    length: number;
}

// Adding Arrray to DummyArray prototype chain.
DummyArray.prototype = new Array();

export = DummyArray;


