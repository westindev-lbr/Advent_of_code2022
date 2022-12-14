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
let line: number = 0;
const tabStacks: Array<string> = [];

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
        if (c.match(/\n/)) line++;
        if (line < 8) tabStacks.push(c);
    }
}


export const fillMapOfStack = () => {
    let nb_col = tabStacks.length / 8;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < nb_col; j++) {
            let c: string = tabStacks[nb_col * i + j];
            if (c.match(/[A-Z]/)) {
                let ind: number = j / 4 + 0.75;
                _stacks.get(ind).unshift(c);
            }
        }
    }
}


export const deleteLinesOfTxt = (nb: number, content: string): string => {
    let newString = "";
    let tab = content.split("\n");
    tab.splice(0, nb);
    //console.log(tab.length);
    newString = tab.join("\n");
    return newString;
};


export const splitAndCollectData = (content: string): Array<number> => {
    let tab = content.split("\n");
    let vec: Array<number> = [];
    tab.forEach((value) => {
        let subTab = value.toString().split(" ");
        subTab.forEach((value) => {
            if (value !== "move" && value !== "from" && value !== "to")
                vec.push(parseInt(value));
        });
    })
    return vec;
}

export const printResultOfTopStack = (map: Map<number, any>): string => {
    let res = "";
    map.forEach((value) => {
        let size = value.length;
        res += value[size - 1];
    });
    return res;
}


export const DofirstMove = (vecData: Array<number>, map?: Map<any, any>) => {
    let move = 0;
    let from = 0;
    let to = 0;
    for (let i = 0; i < 3; i += 3) {
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
}
export const DoSecondMove = (vecData: Array<number>, map: Map<any, any>) => {
    let move = 0;
    let from = 0;
    let to = 0;
    for (let i = 0; i < 6 - 2; i += 3) {
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
}
export const crateMover9000 = (vecData: Array<number>, map: Map<any, any>) => {
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
}


export const crateMover9001 = (vecData: Array<number>, map: Map<any, any>) => {
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
}

export const DofirstMove9001 = (vecData: Array<number>, map?: Map<any, any>) => {
    let move = 0;
    let from = 0;
    let to = 0;
    for (let i = 0; i < 3; i += 3) {
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
}

initTabStacks();
fillMapOfStack();

const prog = (): string => {
    let result = "";
    const newContent = deleteLinesOfTxt(10, content);
    const vecDatas = splitAndCollectData(newContent);
    crateMover9000(vecDatas, _stacks);
    result = printResultOfTopStack(_stacks);
    return result;
};

//const result = prog();
//console.log(result);
