import { _stacks, deleteLinesOfTxt, splitAndCollectData, printResultOfTopStack, DofirstMove, DoSecondMove, DoAllMoves } from './p1';
import * as fs from 'node:fs/promises';
const bufferTest = await fs.readFile('test.txt');
const buffer = await fs.readFile('input.txt');
let initStack = structuredClone(_stacks);
let stackTest1 = structuredClone(_stacks);
let stackTest2 = structuredClone(_stacks);
const textInput = bufferTest.toString();
const content = buffer.toString();
const newContent = deleteLinesOfTxt(10, content);
const vecDatas = splitAndCollectData(textInput);
const vecDataContent = splitAndCollectData(newContent);
describe('Rearranged crates between stacks', () => {
    test('should return 3 numbers of each rows -> 12, 4, 1', () => {
        let move = 0;
        let from = 0;
        let to = 0;
        [move, from, to] = splitAndCollectData(textInput);
        expect([move, from, to]).toEqual([12, 4, 1]);
    });
    test('should return 6 numbers of 2 rows -> 1, 4, 1, 2, 4, 8', () => {
        //let vec = splitAndCollectData(textInput);
        let vec2 = splitAndCollectData(newContent);
        console.log(vec2);
        let v = [];
        v.push(vec2[0]);
        v.push(vec2[1]);
        v.push(vec2[2]);
        v.push(vec2[3]);
        v.push(vec2[4]);
        v.push(vec2[5]);
        expect(v).toEqual([1, 4, 1, 2, 4, 8]);
    });
    test('should delete first 10 lines in input.txt', () => {
        let newInput = "";
        newInput = deleteLinesOfTxt(10, textInput);
    });
    test('should return for initial stacks secret VFQBQGHFR', () => {
        let result = printResultOfTopStack(initStack);
        expect(result).toEqual("VFQBQGHFR");
    });
    test('should return stacks secret for first move BFQDQGHFR', () => {
        DofirstMove(vecDataContent, stackTest1);
        let result = printResultOfTopStack(stackTest1);
        expect(result).toEqual("BFQDQGHFR");
    });
    test('should return stacks secret after second move BFQLQGHNR', () => {
        DoSecondMove(vecDataContent, stackTest2);
        let result = printResultOfTopStack(stackTest2);
        expect(result).toEqual("BFQLQGHNR");
    });
    test('should return stacks secret after second move BSDMQFLSP', () => {
        DoAllMoves(vecDataContent, _stacks);
        let result = printResultOfTopStack(_stacks);
        expect(result).toEqual("BSDMQFLSP");
    });
});
