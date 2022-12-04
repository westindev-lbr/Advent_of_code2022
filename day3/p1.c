#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

#define DELIM " \r\n"
#define BUFF_SIZE 1024


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
            int len = strlen(p);
            int comp_len = (len - 1) / 2;
            for (int i = 0; (SUCCESS == 0) && i < comp_len; i++)
            {
                for (int j = comp_len; (SUCCESS == 0) && j < len; j++)
                {
                    if (buff[i] == buff[j])
                    {
                        c = buff[i];
                        printf("c = %d - %c \n", buff[i], c);
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
    }
    printf("count : %d\n", count);
    fclose(f);
    return acc;
}
