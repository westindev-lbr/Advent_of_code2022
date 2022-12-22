import * as fs from 'node:fs/promises';
const buffer = await fs.readFile('input.txt');
const content = buffer.toString();
const array = [];
let treeArray = [];
export function convertStringToNumberArray(array, content) {
    const tab = content.split("\n");
    for (const row of tab) {
        array.push(row.split('').map(value => Number(value)));
    }
}
/**
 * Créer un tableau 2D de type tree initialisé non visible
 * @param array : Tableau d'entiers représentant la hauteur des arbres
 * @returns : un Tableau 2D de type Tree
 */
export function createMatriceOfTree(array) {
    const treeArray = [];
    for (let i = 0; i < array.length; i++) {
        treeArray.push([]);
        for (let j = 0; j < array[i].length; j++) {
            treeArray[i].push({
                value: array[i][j],
                coord: { i, j },
                vNorth: false,
                vSouth: false,
                vWest: false,
                vEast: false
            });
        }
    }
    return treeArray;
}
/**
 * Initialise la visibilité de l'ensemble des arbres sur les cotés
 * @param treeArray : Tableau 2D de type Tree
 */
export function initTreesOnEdges(treeArray) {
    treeArray[0].forEach(value => value.vNorth = true);
    treeArray[treeArray.length - 1].forEach(value => value.vSouth = true);
    for (let i = 0; i < treeArray.length; i++) {
        treeArray[i][0].vWest = true;
        treeArray[i][treeArray.length - 1].vEast = true;
    }
}
/**
 * Scan la totalité du tableau des bords vers l'intérieur en vérifiant à chaque étape
 * la visibilité des précédents arbres et met à jour les courants le cas échéant
 * @param treeArray : Tableau 2D de type Tree
 */
export function updateTreeVisible(treeArray) {
    let count = 1;
    while (count < treeArray.length - 1) {
        for (let i = 1; i < treeArray.length - 1; i++) {
            let previousVisibleTreeW = treeArray[i][0];
            let previousVisibleTreeE = treeArray[i][treeArray.length - 1];
            for (let j = 1; j < treeArray.length - 1; j++) {
                const isBiggerThanTheFirst = treeArray[i][j].value > previousVisibleTreeW.value;
                if (isBiggerThanTheFirst) {
                    previousVisibleTreeW = treeArray[i][j];
                    treeArray[i][j].vWest = true;
                }
            }
            for (let k = treeArray.length - 2; k > 0; k--) {
                const isBiggerThanTheFirst = treeArray[i][k].value > previousVisibleTreeE.value;
                if (isBiggerThanTheFirst) {
                    previousVisibleTreeE = treeArray[i][k];
                    treeArray[i][k].vEast = true;
                }
            }
        }
        for (let j = 1; j < treeArray.length - 1; j++) {
            let previousVisibleTreeN = treeArray[0][j];
            let previousVisibleTreeS = treeArray[treeArray.length - 1][j];
            for (let k = 1; k < treeArray.length - 1; k++) {
                const isBiggerThanTheFirst = treeArray[k][j].value > previousVisibleTreeN.value;
                if (isBiggerThanTheFirst) {
                    previousVisibleTreeN = treeArray[k][j];
                    treeArray[k][j].vNorth = true;
                }
            }
            for (let l = treeArray.length - 2; l > 0; l--) {
                const isBiggerThanTheFirst = treeArray[l][j].value > previousVisibleTreeS.value;
                if (isBiggerThanTheFirst) {
                    previousVisibleTreeS = treeArray[l][j];
                    treeArray[l][j].vSouth = true;
                }
            }
        }
        count++;
    }
}
export function visibilityFromTree(treeArray, i, j) {
    console.assert(i != 0 || i != treeArray.length - 1);
    console.assert(j != 0 || j != treeArray.length - 1);
    let code = true;
    let countW = 0, countE = 0, countN = 0, countS = 0;
    for (let k = j - 1; code == true && k >= 0; k--) {
        if (treeArray[i][j].value > treeArray[i][k].value) {
            countW++;
        }
        else {
            countW++;
            code = false;
        }
    }
    code = true;
    for (let k = j + 1; code == true && k < treeArray.length; k++) {
        if (treeArray[i][j].value > treeArray[i][k].value) {
            countE++;
        }
        else {
            countE++;
            code = false;
        }
    }
    code = true;
    for (let l = i - 1; code == true && l >= 0; l--) {
        if (treeArray[i][j].value > treeArray[l][j].value) {
            countN++;
        }
        else {
            countN++;
            code = false;
        }
    }
    code = true;
    for (let l = i + 1; code == true && l < treeArray.length; l++) {
        if (treeArray[i][j].value > treeArray[l][j].value) {
            countS++;
        }
        else {
            countS++;
            code = false;
        }
    }
    //console.log(countN, countW, countS, countE)
    return countW * countE * countN * countS;
}
export function scanVisibilityFromAllOfTrees(treeArray) {
    let bestTreeView = 0;
    for (let i = 1; i < treeArray.length - 1; i++) {
        for (let j = 1; j < treeArray.length - 1; j++) {
            const currentTreeView = visibilityFromTree(treeArray, i, j);
            if (currentTreeView > bestTreeView) {
                bestTreeView = currentTreeView;
            }
        }
    }
    return bestTreeView;
}
/**
 * Compte les arbres visibles en scannant la totalité de la matrice2D
 * @param treeArray
 * @returns le nb d'arbres visible
 */
export function countTreeVisible(treeArray) {
    let result = 0;
    for (const row of treeArray) {
        for (const tree of row) {
            if (tree.vNorth || tree.vSouth || tree.vWest || tree.vEast) {
                result++;
            }
        }
    }
    return result;
}
convertStringToNumberArray(array, content);
treeArray = createMatriceOfTree(array);
initTreesOnEdges(treeArray);
updateTreeVisible(treeArray);
const result = countTreeVisible(treeArray);
console.log("Result of tree visibile is : " + result);
const resultPartTwo = scanVisibilityFromAllOfTrees(treeArray);
console.log("Result of best view from a tree is : " + resultPartTwo);
