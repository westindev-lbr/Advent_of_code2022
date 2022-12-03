#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

#define DELIM " \r\n"
#define BUFF_SIZE 128

typedef enum
{
    COL_ONE,
    COL_TWO,
    NB_CHAMP
} Column;

typedef enum
{
    ROCK = 1,
    PAPER = 2,
    SCISSORS = 3
} RPS;

typedef enum
{
    LOST = 0,
    DRAW = 3,
    WIN = 6
} Score;

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
    char *token = NULL;
    int acc = 0;
    int currentScoreAdv = 0;
    int currentScore = 0;

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
            int i = 0;
            char *p = buff;

            while ((token = strtok(p, DELIM)) != NULL)
            {
                if (i == 0)
                    p = NULL;
                switch (i)
                {
                case COL_ONE:
                {
                    char *strOne = strdup(token);
                    assert(strOne);
                    // Rock
                    if (strcmp(strOne, "A") == 0)
                    {
                        currentScoreAdv = ROCK;
                    }
                    // Paper
                    if (strcmp(strOne, "B") == 0)
                    {
                        currentScoreAdv = PAPER;
                    }
                    // Scissors
                    if (strcmp(strOne, "C") == 0)
                    {
                        currentScoreAdv = SCISSORS;
                    }
                    free(strOne);
                    break;
                }
                case COL_TWO:
                {

                    char *strTwo = strdup(token);
                    assert(strTwo);
                    // Rock
                    if (strcmp(strTwo, "X") == 0)
                    {
                        currentScore = ROCK;
                    }
                    // Paper
                    if (strcmp(strTwo, "Y") == 0)
                    {
                        currentScore = PAPER;
                    }
                    // Scissors
                    if (strcmp(strTwo, "Z") == 0)
                    {
                        currentScore = SCISSORS;
                    }
                    free(strTwo);
                    break;
                }
                default:
                    break;
                }
                i++;
            }
            // DUEL
            if (currentScoreAdv == currentScore)
                acc += DRAW;
            if (((currentScoreAdv == ROCK) && (currentScore == PAPER)) || ((currentScoreAdv == PAPER) && (currentScore == SCISSORS)) || ((currentScoreAdv == SCISSORS) && (currentScore == ROCK)))
                acc += WIN;
            acc += currentScore;
        }
    }
    fclose(f);
    return acc;
}
