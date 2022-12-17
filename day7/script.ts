import * as fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

const buffer = await fs.readFile('input.txt');
const content = buffer.toString();

export type Obj = {
    id: string;
    name: string,
    parent_id: string;
    size: number,
    type: string
}

const array: Array<Obj> = [];

export const initArrayWithContent = (array: Array<Obj>, content: string) => {
    const tabInput = content.split("\n");
    let isCommandLs = false;
    const idRoot = uuidv4();
    let currentParentId = idRoot;
    const arrayDir: { id: string; name: string; parent_id: string; size: number; type: string; }[] = [];

    // Premier noeud racine
    array.push({ id: idRoot, name: "/", parent_id: "null", size: 0, type: "dir" });

    for (const row of tabInput) {

        if (row.match(/\$ cd /) && !row.match(/\.\./) && !row.match(/["/"]/)) {
            const last = arrayDir.pop();
            if (last != null)
                currentParentId = last?.id;
            isCommandLs = false;
        }
        else if (row.match(/\$ ls/)) {
            isCommandLs = true;
        }

        else if (isCommandLs && !row.match(/\.\./)) {
            const name = row.split(" ")[1];
            const id = uuidv4();
            if (row.match(/^d/)) {
                array.push({ id, name, parent_id: currentParentId, size: 0, type: "dir" });
                arrayDir.push({ id, name, parent_id: currentParentId, size: 0, type: "dir" });

            }
            else if (row.match(/^[0-9]/)) {
                const size = Number(row.split(" ")[0]);
                array.push({ id, name, parent_id: currentParentId, size, type: "file" });
            }
        }
    }
}

export const reverseArrayAndUpdateSize = (array: Array<Obj>) => {
    array.reverse();
    for (const row of array) {
        array.forEach((value) => {
            if (value.id == row.parent_id) {
                value.size += row.size;
            }
        });
    }
}

export const sumOfDirUnder100000 = (array: Array<Obj>) => {
    let sum = 0;
    const table = [];
    for (const node of array) {
        if (node.type == "dir" && node.size <= 100000) {
            table.push(node);
            sum += node.size;
        }
    }
    return sum;
}

export const sizeOfDisk = (array: Array<Obj>): number => {
    for (const node of array) {
        if (node.name == "/")
            return node.size;
    }
    return 0;
}

export const sizeOfUnusedSpace = (array: Array<Obj>): number => {
    return 70000000 - sizeOfDisk(array);
}

export const sizeRequiredfOrTheUpdate = (array: Array<Obj>): number => {
    return 30000000 - sizeOfUnusedSpace(array)
}

export const findSizeOfSmallestDir = (array: Array<Obj>) => {
    const sizeRequired = sizeRequiredfOrTheUpdate(array);
    let currentSize = 70000000;
    for (const node of array) {
        if (node.type == "dir" && node.size >= sizeRequired) {
            if (node.size < currentSize) {
                currentSize = node.size;
            }
        }
    }
    return currentSize;
}

initArrayWithContent(array, content);
reverseArrayAndUpdateSize(array);
const result = sumOfDirUnder100000(array);
const sumDirSize = sizeOfDisk(array);
const unusedSize = sizeOfUnusedSpace(array);
const sizeRequired = sizeRequiredfOrTheUpdate(array);
const resultTwo = findSizeOfSmallestDir(array);
console.log("Result Part One : " + result);
console.log("rootDir size: " + sumDirSize + " - " + Math.round(sumDirSize * 100 / 70000000) + "%");
console.log("unused size : " + unusedSize + " - " + Math.round(unusedSize * 100 / 70000000) + "%");
console.log("required size : " + sizeRequired + " - " + Math.round(sizeRequired * 100 / 70000000) + "%");
console.log("Result Part Two : " + resultTwo);
