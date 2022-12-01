#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

#define DELIM "\r"
#define BUFF_SIZE 128

int _nb = 0;

int *remplir_tab(char *fname);
int intComparator(const void *first, const void *second);

int main()
{
    int *result = remplir_tab("input.txt");
    assert(result);
    qsort(result, _nb, sizeof(int), intComparator);
    printf("\n");
    int res = 0;
    for (int j = _nb; j > (_nb - 4); j--)
    {
        res += result[j];
        printf("%d \n", result[j]);
    }
    printf("Resultat = %d \n", res);

    free(result);
    return 0;
}

int intComparator(const void *first, const void *second)
{
    int firstInt = *(const int *)first;
    int secondInt = *(const int *)second;
    return firstInt - secondInt;
}

int *remplir_tab(char *fname)
{
    FILE *f = NULL;
    int count = 0;
    char buff[BUFF_SIZE];
    char *token = NULL;
    int acc = 0;
    int *tab = NULL;
    int i = 0;

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

            if ((token = strtok(p, DELIM)) != NULL)
            {
                p = NULL;
                count = strtol(token, NULL, 10);
                if (count == 0)
                {
                    i++;
                }
            }
        }

        fseek(f, 0, SEEK_SET);

        _nb = i;
        tab = (int *)malloc(sizeof(int) * i);
        assert(tab);

        i = 0;

        while ((fgets(buff, BUFF_SIZE, f)) != NULL)
        {

            char *p = buff;

            if ((token = strtok(p, DELIM)) != NULL)
            {

                p = NULL;
                count = strtol(token, NULL, 10);
                acc += count;
                if (count == 0)
                {
                    tab[i] = acc;
                    acc = 0;
                    i++;
                }
            }
        }
    }
    fclose(f);
    return tab;
}
