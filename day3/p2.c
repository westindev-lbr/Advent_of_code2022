#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

#define DELIM " \r\n"
#define BUFF_SIZE 1024

typedef struct groupe
{
    char *str;
    int size;
} Groupe;


int count_score(char *fname);


int main()
{

    printf("\n");
    int res = count_score("input.txt");
    printf("Resultat = %d \n", res);
    return 0;
}

int count_score(char *fname)
{
    FILE *f = NULL;
    char buff[BUFF_SIZE];
    int acc = 0;
    int SUCCESS;
    int c = 0;
    int count = 0;
    Groupe *grp = NULL;
    int k = 0;

    f = fopen(fname, "r");

    if (!f)
    {
        printf("Ouverture du fichier impossible !");
        exit(0);
    }
    else
    {
        while ((fgets(buff, BUFF_SIZE, f)) != NULL)
        {
            SUCCESS = 0;
            char *p = buff;

            if (k >= 3)
            {
                k = 0;
            }

            if (k == 0)
            {
                if (grp)
                {
                    free(grp);
                }
                grp = (Groupe *)malloc(sizeof(Groupe) * 3);
                assert(grp);
                for (int v = 0; v < 3; v++)
                {
                    grp[v].size = 0;
                    grp[v].str = NULL;
                }
            }

            if (k < 3)
            {
                switch (k)
                {
                case 0:
                    grp[0].str = strdup(p);
                    grp[0].size = strlen(p);
                    k++;
                    break;
                case 1:
                    grp[1].str = strdup(p);
                    grp[1].size = strlen(p);
                    k++;
                    break;
                case 2:
                    grp[2].str = strdup(p);
                    grp[2].size = strlen(p);
                    for (int x = 0; x < 3; x++)
                    {
                        printf("%d - %s (%d) \n", x, grp[x].str, grp[x].size);
                    }
                    printf("\n");

                    for (int i = 0; (SUCCESS == 0) && i < grp[0].size; i++)
                    {
                        for (int j = 0; (SUCCESS == 0) && j < grp[1].size; j++)
                        {
                            for (int k = 0; (SUCCESS == 0) && k < grp[2].size; k++)
                            {
                                if (grp[0].str[i] == grp[1].str[j] && grp[0].str[i] == grp[2].str[k])
                                {
                                    c = grp[0].str[i];
                                    printf("c = %d - %c \n", grp[0].str[i], c);
                                    if (c >= 97)
                                    {
                                        acc += c - 96;
                                        count++;
                                    }
                                    else
                                    {
                                        acc += c - 38;
                                        count++;
                                    }
                                    printf("acc = %d \n", acc);
                                    SUCCESS = 1;
                                }
                            }
                        }
                    }
                    k++;
                    break;
                default:
                    break;
                }
            }
        }
    }
    printf("count : %d\n", count);
    fclose(f);
    free(grp);
    return acc;
}
