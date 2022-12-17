import * as fs from 'node:fs/promises';
import { initArrayWithContent, reverseArrayAndUpdateSize, sumOfDirUnder100000 } from './script';
const bufferTest = await fs.readFile('test.txt');
const contentTest = bufferTest.toString();
// Arbre représentant le test
const tree = [
    {
        id: "/",
        parent_id: null,
        size: 0,
        children: [
            {
                id: "a",
                parent_id: "/",
                size: 94853,
                children: [
                    {
                        id: "e",
                        parent_id: "a",
                        size: 584,
                        children: [
                            {
                                id: "i",
                                parent_id: "e",
                                size: 584,
                                children: []
                            }
                        ]
                    },
                    {
                        id: "f",
                        parent_id: "a",
                        size: 29116,
                        children: []
                    },
                    {
                        id: "g",
                        parent_id: "a",
                        size: 2557,
                        children: []
                    },
                    {
                        id: "h.lst",
                        parent_id: "a",
                        size: 62596,
                        children: []
                    },
                ]
            },
            {
                id: "b.txt",
                parent_id: "/",
                size: 14848514,
                children: []
            },
            {
                id: "c.dat",
                parent_id: "/",
                size: 8504156,
                children: []
            },
            {
                id: "d",
                parent_id: "/",
                size: 24933642,
                children: []
            }
        ]
    }
];
describe('Find all of the directories with a total size at most 100000', () => {
    test('Should return the first dir as the root of the tree', () => {
        const arrayTest = [];
        const tabInput = contentTest.split("\n");
        // Parcours du tableau
        /**
         * Choix possible :
         *  cd id : va être suivi d'un ls donc assigner id à currentParent
         *  ls : va toujours être suivi de l'ensemble des enfants donc passe en etat ls -> true
         *  dir id : va etre parcouru plus tard avec un cd
         *  000size id : ligne de fichier avec sa taille et son id
         *  cd .. : remonte d'un répertoire
         */
        // Mettre la size à jour 
        // Problématique : 
        // si on parcours l'ensemble du tableau 
        // à la racine on a dir a, b.txt, c.dat et dir d
        // les tailles des repertoires ne sont pas encores connus
        // par contre si on reverse on pourrait
        initArrayWithContent(arrayTest, contentTest);
        // console.log(arrayTest);
        reverseArrayAndUpdateSize(arrayTest);
        // console.log(arrayTest);
        const result = sumOfDirUnder100000(arrayTest);
        // console.log(result);
        /**
         * Algorithme de création d'arbre avec récursivité
         * @param nodes : tableau contenant l'ensemble des noeuds
         * @param parentId : id du noeud parent
         * @returns : un tableau de ces noeuds modifiés.
        */
        /* Filtrer le tableau pour n'en garder que les noeuds pour lesquels
        la valeur de parent_id est égale à l'id donné en paramètre  */
        /* Renvoyer un tableau de ces noeuds modifiés. On ajoute à chaque noeud un attribut children,
        qui est un tableau construit en utilisant une fonction qui, ayant pour données d'entrée le tableau
        contenant l'ensemble des noeuds et l'id du noeud parend, pourra:
          1. filtrer le tableau pour n'en garder que les noeuds pours lesquels la valeur de parent_id est
          égale à l'id donnée en paramètre
          2. renvoyer un tableau de ces noeuds modifiés. On ajoute à chaque noeud un attribut children, qui est
          un tableau (array) construit en utilisant une fonction qui, ayant pour données d'entrée le tableau
          contenant l'ensemble des noeuds et l'id  du noeud parent, pourra ... */
        const makeTree = (nodes, parentId) => {
            return nodes
                .filter((node) => node.parent_id === parentId)
                .reduce((tree, node) => [...tree,
                {
                    ...node,
                    children: makeTree(nodes, node.id),
                },
            ], []);
        };
        //const arbre = makeTree(arrayTest, "/");
        //console.log(arbre);
    });
});
