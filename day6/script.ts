import * as fs from 'node:fs/promises';

const bufferFinal = await fs.readFile('input.txt');

// Tableau avec l'ensemble des lignes du fichier
const contentFinal = bufferFinal.toString();

// On doit lire une chaine 
// détecter le premier bloc de 4 chars contenant 4 chars différents
// Découper en bloc de 4 chars
export const splitIn4charsBlock = (str: string) : Array<string> =>  {
    let res: Array<string> = [];
    let temp = str.match(/[a-z]/ig)?.join("");
    const reg = /[a-z]{4}/i;
    for(let i = 0 ; i < str.length - 3 ; i++){
        let st = temp?.match(reg)?.join("");
        if(st)
            res.push(st);
        temp = str.substring(i+1);
    }
    return res;
}

// checker dans chaque bloc si il y a des doublons.
export const hasDuplicatesChars = (block: string):boolean => {
    for (let i = 0; i < block.length; i++) {
        let c = block[i];
        for (let j = i+1; j < block.length; j++) {
            if (c === block[j])
            return true            
        }
    }
    return false;
}

// retourne l'index du 1er bloc sans doublons trouvé
export const indexOfMarker = (tabString: Array<string>): number => {
    for (let index in tabString) {
        if (!hasDuplicatesChars(tabString[index])) {
            return Number(index);
        }
    }
    return -1;
}

// Decouper en bloc de 14 chars à chaque iterations de la string
export const splitIn14CharsBlock = (str: string): Array<string> => {
    let res: Array<string> = [];
    let temp = str.match(/[a-z]/ig)?.join("");
    const reg = /[a-z]{14}/i;
    for(let i = 0 ; i < str.length - 13 ; i++){
        let st = temp?.match(reg)?.join("");
        if(st)
            res.push(st);
        temp = str.substring(i+1);
    }
    return res;
}

const tabString = splitIn4charsBlock(contentFinal);
const tabString2 = splitIn14CharsBlock(contentFinal);
const res = indexOfMarker(tabString) + 4;
const res2 = indexOfMarker(tabString2) + 14;

console.log(res);
console.log(res2);