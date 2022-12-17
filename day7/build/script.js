import * as fs from 'node:fs/promises';
const buffer = await fs.readFile('input.txt');
const content = buffer.toString();
const array = [];
export const initArrayWithContent = (array, content) => {
    const tabInput = content.split("\n");
    let isCommandLs = false;
    let currentParent = "";
    // Premier noeud racine
    array.push({ id: "/", parent_id: "", size: 0, type: "dir" });
    currentParent = "/";
    for (const row of tabInput) {
        if (row.match(/\$ cd /) && !row.match(/\.\./)) {
            const id = row.split(" ")[2];
            currentParent = id;
            isCommandLs = false;
        }
        else if (row.match(/\$ ls/)) {
            isCommandLs = true;
        }
        else if (isCommandLs && !row.match(/\.\./)) {
            const id = row.split(" ")[1];
            if (row.match(/^d/)) {
                array.push({ id, parent_id: currentParent, size: 0, type: "dir" });
            }
            else if (row.match(/^[0-9]/)) {
                const size = Number(row.split(" ")[0]);
                array.push({ id, parent_id: currentParent, size, type: "file" });
            }
        }
    }
};
export const reverseArrayAndUpdateSize = (array) => {
    array.reverse();
    for (const row of array) {
        array.forEach((value) => {
            if (value.id == row.parent_id) {
                value.size += row.size;
            }
        });
    }
};
export const sumOfDirUnder100000 = (array) => {
    let sum = 0;
    let count = 0;
    for (const node of array) {
        if (node.id == "/")
            console.log(node);
        if (node.type == "dir" && node.size <= 100000) {
            //console.log(node);
            count++;
            sum += node.size;
        }
    }
    console.log("count = " + count);
    return sum;
};
initArrayWithContent(array, content);
// console.log(array);
reverseArrayAndUpdateSize(array);
console.log(array.length);
const result = sumOfDirUnder100000(array);
console.log(result);
