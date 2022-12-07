import * as fs from 'node:fs/promises';
//const buffer = await fs.readFile('input.txt');
export const buffer = await fs.readFile('input.txt');
// Tableau avec l'ensemble des lignes du fichier
export const content = buffer.toString();
//console.log(content);
export const _stacks = new Map();
/* init stacks  */
for (let i = 1; i <= 9; i++) {
    _stacks.set(i, []);
}
/* Entete Stacks de départ */
let line = 0;
const tabStacks = [];
for (let c of content) {
    if (line < 8) {
        if (c.match(/\n/)) {
            line++;
        }
        tabStacks.push(c);
    }
}
export const initTabStacks = () => {
    for (let c of content) {
        if (c.match(/\n/))
            line++;
        if (line < 8)
            tabStacks.push(c);
    }
};
export const fillMapOfStack = () => {
    let nb_col = tabStacks.length / 8;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < nb_col; j++) {
            let c = tabStacks[nb_col * i + j];
            if (c.match(/[A-Z]/)) {
                let ind = j / 4 + 0.75;
                _stacks.get(ind).unshift(c);
            }
        }
    }
};
export const deleteLinesOfTxt = (nb, content) => {
    let newString = "";
    let tab = content.split("\n");
    tab.splice(0, nb);
    //console.log(tab.length);
    newString = tab.join("\n");
    return newString;
};
export const splitAndCollectData = (content) => {
    let tab = content.split("\n");
    let vec = [];
    tab.forEach((value) => {
        let subTab = value.toString().split(" ");
        subTab.forEach((value) => {
            if (value !== "move" && value !== "from" && value !== "to")
                vec.push(parseInt(value));
        });
    });
    return vec;
};
export const printResultOfTopStack = (map) => {
    let res = "";
    map.forEach((value) => {
        let size = value.length;
        res += value[size - 1];
    });
    return res;
};
export const crateMover9000 = (vecData, map) => {
    let move = 0;
    let from = 0;
    let to = 0;
    for (let i = 0; i < vecData.length - 2; i += 3) {
        move = vecData[i];
        from = vecData[i + 1];
        to = vecData[i + 2];
        for (let j = 0; j < move; j++) {
            let size = map?.get(from)?.length;
            let lastVal = map?.get(from)[size - 1];
            map?.get(to).push(lastVal);
            map?.get(from).pop();
        }
    }
};
export const crateMover9001 = (vecData, map) => {
    let move = 0;
    let from = 0;
    let to = 0;
    for (let i = 0; i < vecData.length - 2; i += 3) {
        move = vecData[i];
        from = vecData[i + 1];
        to = vecData[i + 2];
        let size = map?.get(from)?.length;
        let sp = size - move;
        let fp = sp;
        for (let j = 0; j < move; j++) {
            let val = map?.get(from)[fp];
            map?.get(to).push(val);
            fp++;
        }
        map?.get(from).splice(sp, move);
    }
};
initTabStacks();
fillMapOfStack();
let stack1 = structuredClone(_stacks);
let stack2 = structuredClone(_stacks);
const prog1 = (stack) => {
    let result = "";
    const newContent = deleteLinesOfTxt(10, content);
    const vecDatas = splitAndCollectData(newContent);
    crateMover9000(vecDatas, stack);
    result = printResultOfTopStack(stack);
    return result;
};
const prog2 = (stack) => {
    let result = "";
    const newContent = deleteLinesOfTxt(10, content);
    const vecDatas = splitAndCollectData(newContent);
    crateMover9001(vecDatas, stack);
    result = printResultOfTopStack(stack);
    return result;
};
const result1 = prog1(stack1);
const result2 = prog2(stack2);
console.log(result1);
console.log(result2);
