import {  hasDuplicatesChars, indexOfMarker, splitIn14CharsBlock, splitIn4charsBlock } from './script';
import * as fs from 'node:fs/promises';

const buffer = await fs.readFile('test.txt');
const buffer2 = await fs.readFile('test3.txt');
const content = buffer.toString();
const content2 = buffer2.toString();

describe('Count number or characters before the first start-of-packet marker', () => {

    const tabString = splitIn4charsBlock(content);
    const tabString2 = splitIn14CharsBlock(content2);

    test('Should return tab of 4chars ', () => {

        let res = splitIn4charsBlock(content);
        expect(res).toEqual([
            'nznr', 'znrn', 'nrnf', 'rnfr',
            'nfrf', 'frfn', 'rfnt', 'fntj',
            'ntjf', 'tjfm', 'jfmv', 'fmvf',
            'mvfw', 'vfwm', 'fwmz', 'wmzd',
            'mzdf', 'zdfj', 'dfjl', 'fjlv',
            'jlvt', 'lvtq', 'vtqn', 'tqnb',
            'qnbh', 'nbhc', 'bhcp', 'hcpr',
            'cprs', 'prsg'
        ]);

    });

    test('Should return true if has duplicates chars inside a block ', () => {

        const block: string = "nznr";
        const res = hasDuplicatesChars(block);
        expect(res).toBe(true);
    });

    test('Should return the index of first block that dont have duplicate', () => {

        const index = indexOfMarker(tabString);
        expect(index).toBe(6);
    });

    test('Should return the number of chars processed before find the first marker', () => {

        const res: number = indexOfMarker(tabString) + 4;
        expect(res).toBe(10);
    });

    test('Should return the number of chars processed before find the message marker', () => {

        const res: number = indexOfMarker(tabString2) + 14; 
        expect(res).toBe(29);

    });

});



