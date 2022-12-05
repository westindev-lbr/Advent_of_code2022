#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

#define DELIM "-,\r\n"
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
    int count = 0;
    char *token = NULL;
    int pair1[2] = {0, 0};
    int pair2[2] = {0, 0};

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
            char *p = buff;
            int i = 0;

            while ((token = strtok(p, DELIM)) != NULL)
            {
                if (i == 0)
                    p = NULL;
                switch (i)
                {
                case 0:
                    pair1[0] = strtol(token, NULL, 10);
                    count++;
                    break;
                case 1:
                    pair1[1] = strtol(token, NULL, 10);
                    count++;
                    break;
                case 2:
                    pair2[0] = strtol(token, NULL, 10);
                    count++;
                    break;
                case 3:
                    pair2[1] = strtol(token, NULL, 10);
                    count++;
                    break;
                default:
                    break;
                }
                i++;
            }
            if ((pair1[0] <= pair2[0] && pair1[1] >= pair2[1]) || (pair2[0] <= pair1[0] && pair2[1] >= pair1[1]))
            {
                acc++;
            }
            else if ((pair1[1] >= pair2[0] && pair2[0] >= pair1[0]) || (pair2[1] >= pair1[0] && pair1[0] >= pair2[0]))
            {
                acc++;
            }
        }
    }
    printf("count : %d\n", count);
    fclose(f);
    return acc;
}
