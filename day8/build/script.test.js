import * as fs from 'node:fs/promises';
import { convertStringToNumberArray, countTreeVisible, createMatriceOfTree, initTreesOnEdges, updateTreeVisible, visibilityFromTree } from './script';
const bufferTest = await fs.readFile('test.txt');
const contentTest = bufferTest.toString();
describe('Treetop Tree House Tests', () => {
    const array = [];
    let treeArrayTest = [];
    test('Should return a matrice 2D of int', () => {
        convertStringToNumberArray(array, contentTest);
        expect(array).toEqual([
            [3, 0, 3, 7, 3],
            [2, 5, 5, 1, 2],
            [6, 5, 3, 3, 2],
            [3, 3, 5, 4, 9],
            [3, 5, 3, 9, 0]
        ]);
    });
    test('Should return a matrice 2D of Tree type', () => {
        treeArrayTest = createMatriceOfTree(array);
    });
    test('Should initialize edge tree in visible', () => {
        initTreesOnEdges(treeArrayTest);
    });
    test('Should return 16 trees visible on the edge ', () => {
        const result = countTreeVisible(treeArrayTest);
        expect(result).toBe(16);
    });
    test('Should return 21 trees visible ', () => {
        updateTreeVisible(treeArrayTest);
        const nb = countTreeVisible(treeArrayTest);
        expect(nb).toBe(21);
    });
    test('Should return 4 as scenicScore of tree[1][2]', () => {
        const score = visibilityFromTree(treeArrayTest, 1, 2);
        expect(score).toBe(4);
    });
    test('Should return 8 as scenicScore of tree[3][2]', () => {
        const scoreb = visibilityFromTree(treeArrayTest, 3, 2);
        expect(scoreb).toBe(8);
    });
});
