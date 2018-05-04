/*
 Pairing functions for MockTab.js
 Copyright (C) 2018  Allen Barr
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


var round3TestData = [{
        "number": 1071,
        "r1plaintiff": true,
        "conflicts": [1504, 1434],
        "wins": 4,
        "cs": 1,
        "pd": 28
    },
    {
        "number": 1209,
        "r1plaintiff": true,
        "conflicts": [1210, 1433, 1211],
        "wins": 1,
        "cs": 3,
        "pd": -23
    },
    {
        "number": 1210,
        "r1plaintiff": true,
        "conflicts": [1209, 1211, 1433],
        "wins": 4,
        "cs": 3,
        "pd": 35
    },
    {
        "number": 1211,
        "r1plaintiff": false,
        "conflicts": [1210, 1209],
        "wins": 2,
        "cs": 5,
        "pd": 6
    },
    {
        "number": 1433,
        "r1plaintiff": false,
        "conflicts": [1434, 1209, 1210],
        "wins": 1,
        "cs": 5,
        "pd": -18
    },
    {
        "number": 1434,
        "r1plaintiff": false,
        "conflicts": [1433, 1558, 1071],
        "wins": 1,
        "cs": 7,
        "pd": -14
    },
    {
        "number": 1504,
        "r1plaintiff": false,
        "conflicts": [1071, 1558],
        "wins": 0,
        "cs": 7,
        "pd": -33
    },
    {
        "number": 1558,
        "r1plaintiff": true,
        "conflicts": [1434, 1504],
        "wins": 3,
        "cs": 1,
        "pd": 19
    }
];

var tournament = {
    "lowerTeamNumberIsHigherRank": true
};
var p = pairRound3(round3TestData);
for (var a = 0; a < p.length; a++) {
    console.log(p[a][0].number + " v. " + p[a][1].number);
}

function pairRound1(teams) {

    //Duplicate the teams list
    var r1teams = teams.slice();

    //Fisher-Yates shuffle algorithm applied to list of teams
    var j, x, i;
    for (i = r1teams.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = r1teams[i];
        r1teams[i] = r1teams[j];
        r1teams[j] = x;
    }

    //Create initial pairings
    var pairings = [];
    for (var a = 0; a < r1teams.length / 2; a++) {
        pairings.push([r1teams[a * 2], r1teams[a * 2 + 1]]);
    }

    //Check if there are any conflicts
    for (var a = 0; a < pairings.length; a++) {
        if (pairings[a][0].conflicts.includes(pairings[a][1].number) ||
            pairings[a][1].conflicts.includes(pairings[a][0].number)) {
            pairings = pairRound1(teams);
            a = pairings.length;
        }
    }
    return pairings;
}

function pairRound2(teams) {
    //Sort teams into needs plaintiff and needs defense
    var needsP = [];
    var needsD = [];
    for (var a = 0; a < teams.length; a++) {
        if (teams[a].r1plaintiff) {
            needsD.push(teams[a]);
        }
        else {
            needsP.push(teams[a]);
        }
    }

    //Rank each group
    needsP = rankTeams(needsP);
    needsD = rankTeams(needsD);

    //Create initial pairings from ranked teams
    var pairings = [];
    for (var a = 0; a < needsP.length; a++) {
        pairings.push([needsP[a], needsD[a]]);
    }

    pairings = resolveImpermissibleConstrainedSides(pairings);

    return pairings;
}

function pairRound3(teams) {
    var r3teams = teams.slice(); //Duplicate teams array
    r3teams = rankTeams(r3teams); //Rank that array
    r3teams = resolveImpermissibleUnconstrainedSides(r3teams); //Resolve impermissible matches

    //Do the snake!
    var pairings = [];
    for (var a = 0; a < r3teams.length / 2; a++) {
        if (tournament.snakeEvens) {
            if (a % 2 == 0) {
                pairings.push([r3teams[a * 2 + 1], r3teams[a * 2]]);
            }
            else {
                pairings.push([r3teams[a * 2], r3teams[a * 2 + 1]]);
            }
        }
        else {
            if (a % 2 == 0) {
                pairings.push([r3teams[a * 2], r3teams[a * 2 + 1]]);
            }
            else {
                pairings.push([r3teams[a * 2 + 1], r3teams[a * 2]]);
            }
        }
    }
    return pairings;
}

function pairRound4(teams) {
    //Sort teams into needs plaintiff and needs defense
    var needsP = [];
    var needsD = [];
    for (var a = 0; a < teams.length; a++) {
        if (teams[a].r3plaintiff) {
            needsD.push(teams[a]);
        }
        else {
            needsP.push(teams[a]);
        }
    }

    //Rank each group
    needsP = rankTeams(needsP);
    needsD = rankTeams(needsD);

    //Create initial pairings from ranked teams
    var pairings = [];
    for (var a = 0; a < needsP.length; a++) {
        pairings.push([needsP[a], needsD[a]]);
    }

    //Resolve impermissible matches
    pairings = resolveImpermissibleConstrainedSides(pairings);

    return pairings;
}

function rankTeams(teams) {

    /*
     Variables to hold the current max record
     They start from the top and iterate downward,
     until there is only one team in a group.
     That team (which will necessarily be the best team)
     is then pushed to the ranked array, and the iteration begins
     again on the same list, less the team that was pushed
     to the ranked team list
     */
    var numberOfTeams = teams.length;
    var rankedTeams = [];

    while (rankedTeams.length < numberOfTeams) {
        //Loop through teams to determine top wins
        var maxWins = 0;
        for (var a = 0; a < teams.length; a++) {
            if (teams[a].wins > maxWins) {
                maxWins = teams[a].wins;
            }
        }

        //Put all teams with the top wins in an array
        var topRecordTeams = [];
        for (var a = 0; a < teams.length; a++) {
            if (teams[a].wins == maxWins) {
                topRecordTeams.push(teams[a]);
            }
        }

        //Find top CS for teams with top wins
        var maxCS = 0;
        for (var a = 0; a < topRecordTeams.length; a++) {
            if (topRecordTeams[a].cs > maxCS) {
                maxCS = topRecordTeams[a].cs;
            }
        }

        //Put all teams with the top CS in an array
        var topCSTeams = [];
        for (var a = 0; a < topRecordTeams.length; a++) {
            if (topRecordTeams[a].cs == maxCS) {
                topCSTeams.push(topRecordTeams[a]);
            }
        }

        //Find top PD for teams with top wins and top CS
        var maxPD = -9999;
        for (var a = 0; a < topCSTeams.length; a++) {
            if (topCSTeams[a].pd > maxPD) {
                maxPD = topCSTeams[a].pd;
            }
        }

        //Put all teams with top PD in an array
        var topPDTeams = [];
        for (var a = 0; a < topCSTeams.length; a++) {
            if (topCSTeams[a].pd == maxPD) {
                topPDTeams.push(topCSTeams[a]);
            }
        }


        /*
         If there are multiple teams with identical wins, CS, and PD
         then use either the highest or lowest team number, depending
         on the coin flip from the start of the tournament
         */

        //Initially, take the first team in the array of tied teams
        var topTeamNumber = topPDTeams[0].number;
        //Then, loop throgh array, and compare the team number
        for (var a = 0; a < topPDTeams.length; a++) {
            if (tournament.lowerTeamNumberIsHigherRank) {
                //If lower team number is higher ranked, then search for lowest team number
                if (topPDTeams[a].number < topTeamNumber) {
                    topTeamNumber = topPDTeams[a].number;
                }
            }
            else {
                //Else, search for highest team number
                if (topPDTeams[a].number > topTeamNumber) {
                    topTeamNumber = topPDTeams[a].number;
                }
            }
        }

        //Finally, push that top team to the ranked teams array
        //And then remove it from the list of teams to be ranked
        for (var a = 0; a < teams.length; a++) {
            if (teams[a].number == topTeamNumber) {
                rankedTeams.push(teams[a]); //Push to ranked teams
                teams.splice(a, 1);
            }
        }
    }

    return rankedTeams;
}

/*
 * Takes in an array of side constrained pairings
 * and returns an array of those pairings with any
 * impermissible matches resolved
 *
 * @param pairings An array of ranked, side-constrained pairings
 * for example pairings[0][0] is the top plaintiff team
 * and pairings[2][1] is the third-ranked defense team
 */

function resolveImpermissibleConstrainedSides(pairings) {
    var swapList = [];
    //Iterate through each pairing
    for (var a = 0; a < pairings.length; a++) {
        //Assign teams to variables to make syntax easier to understand
        var pTeam = pairings[a][0];
        var dTeam = pairings[a][1];

        //Check if the pairing is a conflict
        if (pTeam.conflicts.includes(dTeam.number ||
                dTeam.conflicts.includes(pTeam.number))) {

            //Create list of all possible swaps for each side
            var pAllSwaps = [];
            var dAllSwaps = [];
            //Iterate through all teams and add them to potential swap list
            for (var b = 0; b < pairings.length; b++) {
                //Don't add a swap with itself to the list
                if (b != a) {
                    pAllSwaps.push({
                        "team": pairings[b][0],
                        "rank": b,
                        "winDistance": Math.abs(pairings[a][0].wins - pairings[b][0].wins),
                        "csDistance": Math.abs(pairings[a][0].cs - pairings[b][0].cs),
                        "pdDistance": Math.abs(pairings[a][0].pd - pairings[b][0].pd)
                    });
                    dAllSwaps.push({
                        "team": pairings[b][1],
                        "rank": b,
                        "winDistance": Math.abs(pairings[a][1].wins - pairings[b][1].wins),
                        "csDistance": Math.abs(pairings[a][1].cs - pairings[b][1].cs),
                        "pdDistance": Math.abs(pairings[a][1].pd - pairings[b][1].pd)
                    });
                }
            }

            /*Remove all swaps that are on the swap list
             Note that pSwaps and dSwaps are necessarily the same length
             So we can use one for loop to go through both
             We also start at the top and work down, so that as we remove
             items, we are still sure to hit every item
             */

            var swapListSize = pAllSwaps.length;
            for (var b = swapListSize - 1; b > -1; b--) {
                var pSwapTeam = pAllSwaps[b].team;
                var dSwapTeam = dAllSwaps[b].team;
                //Check if swap list contains pSwap
                if (swapList.includes([pTeam.number, pSwapTeam.number]) ||
                    swapList.includes([pSwapTeam.number, pTeam.number])) {
                    pAllSwaps.splice(b, 1); //if so, remove the swap
                }

                //Check if swap list containds dSwap
                if (swapList.includes([dTeam.number, dSwapTeam.number]) ||
                    swapList.includes([dSwapTeam.number, dTeam.number])) {
                    dAllSwaps.splice(b, 1); //if so, remove the swap
                }
            }

            /*
             * Having removed all prior swaps, we now need to find
             * the minimum rank distance. Now that we've removed prior
             * swaps, the swap arrays may be different lengths, so each array
             * needs its own for loop
             */

            //Define var to hold min distance, and set it to be very large initially
            var minPRankDistance = 9999;
            var minDRankDistance = 9999;

            //Determine min rank distance
            for (var b = 0; b < pAllSwaps.length; b++) {
                var rankDistance = Math.abs(a - pAllSwaps[b].rank);
                if (rankDistance < minPRankDistance) {
                    minPRankDistance = rankDistance;
                }
            }
            for (var b = 0; b < dAllSwaps.length; b++) {
                var rankDistance = Math.abs(a - dAllSwaps[b].rank);
                if (rankDistance < minDRankDistance) {
                    minDRankDistance = rankDistance;
                }
            }

            //Remove any swaps whose rank distance is greater than the min
            //Start from top and go downward to avoid missing anything
            for (var b = pAllSwaps.length - 1; b > -1; b--) {
                var rankDistance = Math.abs(a - pAllSwaps[b].rank);
                if (rankDistance > minPRankDistance) {
                    pAllSwaps.splice(b, 1);
                }
            }
            for (var b = dAllSwaps.length - 1; b > -1; b--) {
                var rankDistance = Math.abs(a - dAllSwaps[b].rank);
                if (rankDistance > minDRankDistance) {
                    dAllSwaps.splice(b, 1);
                }
            }

            //Define min win distance, make it initially very big
            var minPWinDistance = 9999;
            var minDWinDistance = 9999;

            //Loop through and find the actual minWin distance
            for (var b = 0; b < pAllSwaps.length; b++) {
                if (pAllSwaps[b].winDistance < minPWinDistance) {
                    minPWinDistance = pAllSwaps[b].winDistance;
                }
            }
            for (var b = 0; b < dAllSwaps.length; b++) {
                if (dAllSwaps[b].winDistance < minDWinDistance) {
                    minDWinDistance = dAllSwaps[b].winDistance;
                }
            }

            //Remove any swaps whose win distance is greater than the min
            for (var b = pAllSwaps.length - 1; b > -1; b--) {
                if (pAllSwaps[b].winDistance > minPWinDistance) {
                    pAllSwaps.splice(b, 1);
                }
            }
            for (var b = dAllSwaps.length - 1; b > -1; b--) {
                if (dAllSwaps[b].winDistance > minDWinDistance) {
                    dAllSwaps.splice(b, 1);
                }
            }

            //Define min CS distance, make it initially very big
            var minPCSDistance = 9999;
            var minDCSDistance = 9999;

            //Loop through and find the actual minCS distance
            for (var b = 0; b < pAllSwaps.length; b++) {
                if (pAllSwaps[b].csDistance < minPCSDistance) {
                    minPCSDistance = pAllSwaps[b].csDistance;
                }
            }
            for (var b = 0; b < dAllSwaps.length; b++) {
                if (dAllSwaps[b].csDistance < minDCSDistance) {
                    minDCSDistance = dAllSwaps[b].csDistance;
                }
            }

            //Remove any swaps whose CS distance is greater than the min
            for (var b = pAllSwaps.length - 1; b > -1; b--) {
                if (pAllSwaps[b].csDistance > minPCSDistance) {
                    pAllSwaps.splice(b, 1);
                }
            }
            for (var b = dAllSwaps.length - 1; b > -1; b--) {
                if (dAllSwaps[b].csDistance > minDCSDistance) {
                    dAllSwaps.splice(b, 1);
                }
            }

            //Define min PD distance, make it initially very big
            var minPPDDistance = 9999;
            var minDPDDistance = 9999;

            //Loop through and find the actual minPD distance
            for (var b = 0; b < pAllSwaps.length; b++) {
                if (pAllSwaps[b].pdDistance < minPPDDistance) {
                    minPPDDistance = pAllSwaps[b].pdDistance;
                }
            }
            for (var b = 0; b < dAllSwaps.length; b++) {
                if (dAllSwaps[b].pdDistance < minDPDDistance) {
                    minDPDDistance = dAllSwaps[b].pdDistance;
                }
            }

            //Remove any swaps whose PD distance is greater than the min
            for (var b = pAllSwaps.length - 1; b > -1; b--) {
                if (pAllSwaps[b].pdDistance > minPPDDistance) {
                    pAllSwaps.splice(b, 1);
                }
            }
            for (var b = dAllSwaps.length - 1; b > -1; b--) {
                if (dAllSwaps[b].pdDistance > minDPDDistance) {
                    dAllSwaps.splice(b, 1);
                }
            }

            /*
             If there are still two swaps for each side (there can't be more than two
             because only two possible swaps can be of equal rank distance),
             then need to narrow to one, using Sum Of Ranks (Greater is Better)
             */
            if (pAllSwaps.length > 1) {
                if ((pAllSwaps[0].rank + a) > (pAllSwaps[1].rank + a)) { //Check which rank sum is greater
                    pAllSwaps.splice(1, 1);
                }
                else { //And remove the other one
                    pAllSwaps.splice(0, 1);
                }
            }
            if (dAllSwaps.length > 1) {
                if ((dAllSwaps[0].rank + a) > (dAllSwaps[1].rank + a)) { //Check which rank sum is greater
                    dAllSwaps.splice(1, 1);
                }
                else { //And remove the other one
                    dAllSwaps.splice(0, 1);
                }
            }

            /*
             We now have a potential pSwap and a potential dSwap
             We then need to determine which one to used, based on
             which one involves a smaller distance
             */
            var swapP;

            var pRankDistance = Math.abs(pAllSwaps[0].rank - a);
            var dRankDistance = Math.abs(dAllSwaps[0].rank - a);
            if (pRankDistance < dRankDistance) {
                swapP = true;
            }
            else if (dRankDistance < pRankDistance) {
                swapP = false;
            }
            else {
                if (pAllSwaps[0].winDistance < dAllSwaps[0].winDistance) {
                    swapP = true;
                }
                else if (dAllSwaps[0].winDistance < pAllSwaps[0].winDistance) {
                    swapP = false;
                }
                else {
                    if (pAllSwaps[0].csDistance < dAllSwaps[0].csDistance) {
                        swapP = true;
                    }
                    else if (dAllSwaps[0].csDistance < pAllSwaps[0].csDistance) {
                        swapP = false;
                    }
                    else {
                        if (pAllSwaps[0].pdDistance < dAllSwaps[0].pdDistance) {
                            swapP = true;
                        }
                        else if (dAllSwaps[0].pdDistance < pAllSwaps[0].pdDistance) {
                            swapP = false;
                        }
                        else {
                            var pRankSum = a + pAllSwaps[0].rank;
                            var dRankSum = a + dAllSwaps[0].rank;
                            if (pRankSum > dRankSum) {
                                swapP = true;
                            }
                            else if (dRankSum > pRankSum) {
                                swapP = false;
                            }
                            else {
                                swapP = false;
                            }
                        }
                    }
                }
            }

            //Perform the swap and add the swap to the swap list  
            if (swapP) {
                var swapListEntry = [pairings[a][0].number, pAllSwaps[0].team.number];
                pairings[pAllSwaps[0].rank][0] = pTeam;
                pairings[a][0] = pAllSwaps[0].team;
                swapList.push(swapListEntry);
            }
            else {
                var swapListEntry = [pairings[a][1].number, dAllSwaps[0].team.number];
                pairings[dAllSwaps[0].rank][1] = dTeam;
                pairings[a][1] = dAllSwaps[0].team;
                swapList.push(swapListEntry);
            }
            //Having resolved the conflict, reset a = -1 and start
            //Checking from the top again for any new conflicts
            a = -1;
        }
    }
    return pairings;
}

/*
 * Takes in an array of ranked, unside-constrained teams
 * and resolves impermissible matches on the assumption
 * that array[0] faces array[1], array[2] faces array[3], et cetera
 *
 * @param pairings An array of ranked, unside-constrained teams
 */

function resolveImpermissibleUnconstrainedSides(pairings) {
    var swapList = [];
    //Iterate through each pairing (length/2 because the pairings list
    //contains all 24 teams in ranked order)

    for (var a = 0; a < pairings.length / 2; a++) {

        //Assign teams to variables to make syntax easier to understand
        var pTeam = pairings[a * 2];
        var dTeam = pairings[a * 2 + 1];

        //Check if there is a conflict
        if (pTeam.conflicts.includes(dTeam.number) || dTeam.conflicts.includes(pTeam)) {
            //If there is a conflict, create a list of all possible swaps
            var pSwaps = [];
            var dSwaps = [];

            //Iterate through all teams, adding them to swap lists (but skipping self swap)
            for (var b = 0; b < pairings.length / 2; b++) {

                if (b != a) { //When index equals index of the conflict pairing, don't add those teams to the list
                    pSwaps.push({
                        "team": pairings[b * 2],
                        "rank": b * 2,
                        "winDistance": Math.abs(pairings[a * 2].wins - pairings[b * 2].wins),
                        "csDistance": Math.abs(pairings[a * 2].cs - pairings[b * 2].cs),
                        "pdDistance": Math.abs(pairings[a * 2].pd - pairings[b * 2].pd)
                    });
                    pSwaps.push({
                        "team": pairings[b * 2 + 1],
                        "rank": b * 2 + 1,
                        "winDistance": Math.abs(pairings[a * 2].wins - pairings[b * 2 + 1].wins),
                        "csDistance": Math.abs(pairings[a * 2].cs - pairings[b * 2 + 1].cs),
                        "pdDistance": Math.abs(pairings[a * 2].pd - pairings[b * 2 + 1].pd)
                    });
                    dSwaps.push({
                        "team": pairings[b * 2],
                        "rank": b * 2,
                        "winDistance": Math.abs(pairings[a * 2 + 1].wins - pairings[b * 2].wins),
                        "csDistance": Math.abs(pairings[a * 2 + 1].cs - pairings[b * 2].cs),
                        "pdDistance": Math.abs(pairings[a * 2 + 1].pd - pairings[b * 2].pd)
                    });
                    dSwaps.push({
                        "team": pairings[b * 2 + 1],
                        "rank": b * 2 + 1,
                        "winDistance": Math.abs(pairings[a * 2 + 1].wins - pairings[b * 2 + 1].wins),
                        "csDistance": Math.abs(pairings[a * 2 + 1].cs - pairings[b * 2 + 1].cs),
                        "pdDistance": Math.abs(pairings[a * 2 + 1].pd - pairings[b * 2 + 1].pd)
                    });
                }
            }

            /*
             * Remove all swaps from pSwaps and dSwaps that are on the swap list
             * Note that one for loop can be used because these lists are the same size by definition
             * We also start from the top and work down, to ensure all indicies are hit
             */

            var swapsSize = pSwaps.length;
            for (var b = swapsSize - 1; b > -1; b--) {
                var pSwapTeam = pSwaps[b].team;
                var dSwapTeam = dSwaps[b].team;
                if (swapList.includes([pSwapTeam.number, pTeam.number]) ||
                    swapList.includes([pTeam.number, pSwapTeam.number])) {
                    pSwaps.splice(b, 1);
                }
                if (swapList.includes([dSwapTeam.number, dTeam.number]) ||
                    swapList.includes([dTeam.number, dSwapTeam.number])) {
                    dSwaps.splice(b, 1);
                }
            }

            /*
             * Having removed all prior swaps, now need to find the closest team
             * from both the potential pSwaps and potential dSwaps
             * We do this by looking first at rank, then wins, then cs, then pd
             */

            //Define variable to hold min rank distance, and make it intially large
            var minPRankDistance = 9999;
            var minDRankDistance = 9999;
            //Determine min rank distance for pSwaps and dSwaps
            for (var b = 0; b < pSwaps.length; b++) {
                var rankDistance = Math.abs((a * 2) - pSwaps[b].rank);
                if (rankDistance < minPRankDistance) {
                    minPRankDistance = rankDistance;
                }
            }
            for (var b = 0; b < dSwaps.length; b++) {
                var rankDistance = Math.abs((a * 2 + 1) - dSwaps[b].rank);
                if (rankDistance < minDRankDistance) {
                    minDRankDistance = rankDistance;
                }
            }
            //Remove any swaps that do not have the minRankDistance
            for (var b = pSwaps.length - 1; b > -1; b--) {
                var rankDistance = Math.abs((a * 2) - pSwaps[b].rank);
                if (rankDistance > minPRankDistance) {
                    pSwaps.splice(b, 1);
                }
            }
            for (var b = dSwaps.length - 1; b > -1; b--) {
                var rankDistance = Math.abs((a * 2 + 1) - dSwaps[b].rank);
                if (rankDistance > minDRankDistance) {
                    dSwaps.splice(b, 1);
                }
            }

            //Define variable to hold win rank distance, and make it intially large
            var minPWinDistance = 9999;
            var minDWinDistance = 9999;
            //Determine min win distance for pSwaps and dSwaps
            for (var b = 0; b < pSwaps.length; b++) {
                var winDistance = Math.abs(pTeam.wins - pSwaps[b].wins);
                if (winDistance < minPWinDistance) {
                    minPWinDistance = winDistance;
                }
            }
            for (var b = 0; b < dSwaps.length; b++) {
                var winDistance = Math.abs(dTeam.wins - dSwaps[b].wins);
                if (winDistance < minDWinDistance) {
                    minDWinDistance = winDistance;
                }
            }
            //Remove any swaps that do not have the minWinDistance
            for (var b = pSwaps.length - 1; b > -1; b--) {
                var winDistance = Math.abs(pTeam.wins - pSwaps[b].wins);
                if (winDistance > minPWinDistance) {
                    pSwaps.splice(b, 1);
                }
            }
            for (var b = dSwaps.length - 1; b > -1; b--) {
                var winDistance = Math.abs(dTeam.wins - dSwaps[b].wins);
                if (winDistance > minDWinDistance) {
                    dSwaps.splice(b, 1);
                }
            }

            //Define variable to hold CS distance, and make it intially large
            var minPCSDistance = 9999;
            var minDCSDistance = 9999;
            //Determine min cs distance for pSwaps and dSwaps
            for (var b = 0; b < pSwaps.length; b++) {
                var csDistance = Math.abs(pTeam.cs - pSwaps[b].cs);
                if (csDistance < minPCSDistance) {
                    minPCSDistance = csDistance;
                }
            }
            for (var b = 0; b < dSwaps.length; b++) {
                var csDistance = Math.abs(dTeam.cs - dSwaps[b].cs);
                if (csDistance < minDCSDistance) {
                    minDCSDistance = csDistance;
                }
            }
            //Remove any swaps that do not have the minCSDistance
            for (var b = pSwaps.length - 1; b > -1; b--) {
                var csDistance = Math.abs(pTeam.cs - pSwaps[b].cs);
                if (csDistance > minPCSDistance) {
                    pSwaps.splice(b, 1);
                }
            }
            for (var b = dSwaps.length - 1; b > -1; b--) {
                var csDistance = Math.abs(dTeam.cs - dSwaps[b].cs);
                if (csDistance > minDCSDistance) {
                    dSwaps.splice(b, 1);
                }
            }

            //Define variable to hold PD distance, and make it intially large
            var minPPDDistance = 9999;
            var minDPDDistance = 9999;
            //Determine min PD distance for pSwaps and dSwaps
            for (var b = 0; b < pSwaps.length; b++) {
                var pdDistance = Math.abs(pTeam.pd - pSwaps[b].pd);
                if (pdDistance < minPPDDistance) {
                    minPPDDistance = pdDistance;
                }
            }
            for (var b = 0; b < dSwaps.length; b++) {
                var pdDistance = Math.abs(dTeam.pd - dSwaps[b].pd);
                if (pdDistance < minDPDDistance) {
                    minDPDDistance = pdDistance;
                }
            }
            //Remove any swaps that do not have the minPPDDistance
            for (var b = pSwaps.length - 1; b > -1; b--) {
                var pdDistance = Math.abs(pTeam.pd - pSwaps[b].pd);
                if (pdDistance > minPPDDistance) {
                    pSwaps.splice(b, 1);
                }
            }
            for (var b = dSwaps.length - 1; b > -1; b--) {
                var pdDistance = Math.abs(dTeam.pd - dSwaps[b].pd);
                if (pdDistance > minDPDDistance) {
                    dSwaps.splice(b, 1);
                }
            }

            /*
             * Having found the closest teams in each potential swap list,
             * we now need to see if there is more than one potential pSwap,
             * or more than one potential dSwap. If so, use sum of ranks
             * to eliminate the inferior (lower rank sum) swap.
             */
            if (pSwaps.length > 1) {
                if (a + pSwaps[0].rank > a + pSwaps[1].rank) {
                    pSwaps.splice(1, 1);
                }
                else {
                    pSwaps.splice(0, 1);
                }
            }
            if (dSwaps.length > 1) {
                if (a + 1 + dSwaps[0].rank > a + 1 + dSwaps[1].rank) {
                    dSwaps.splice(1, 1);
                }
                else {
                    dSwaps.splice(0, 1);
                }
            }

            /*
             * There is now one pSwap and one dSwap
             * They need to be compared to determine which is closer
             */
            var swapP;
            var pRankDistance = Math.abs(pSwaps[0].rank - a * 2);
            var dRankDistance = Math.abs(dSwaps[0].rank - (a * 2 + 1));
            if (pRankDistance < dRankDistance) {
                swapP = true;
            }
            else if (dRankDistance < pRankDistance) {
                swapP = false;
            }
            else {
                if (pSwaps[0].winDistance < dSwaps[0].winDistance) {
                    swapP = true;
                }
                else if (dSwaps[0].winDistance < pSwaps[0].winDistance) {
                    swapP = false;
                }
                else {
                    if (pSwaps[0].csDistance < dSwaps[0].csDistance) {
                        swapP = true;
                    }
                    else if (dSwaps[0].csDistance < pSwaps[0].csDistance) {
                        swapP = false;
                    }
                    else {
                        if (pSwaps[0].pdDistance < dSwaps[0].pdDistance) {
                            swapP = true;
                        }
                        else if (dSwaps[0].pdDistance < pSwaps[0].pdDistance) {
                            swapP = false;
                        }
                        else {
                            var pRankSum = a + pSwaps[0].rank;
                            var dRankSum = a + 1 + dSwaps[0].rank;
                            if (pRankSum > dRankSum) {
                                swapP = true;
                            }
                            else {
                                swapP = false;
                            }
                        }
                    }
                }
            }

            //Perform the swap and add the swap to the swap list
            if (swapP) {
                var swapListEntry = [pTeam.number, pSwaps[0].team.number];
                pairings[a * 2] = pSwaps[0].team;
                pairings[pSwaps[0].rank] = pTeam;
                swapList.push(swapListEntry);
            }
            else {
                var swapListEntry = [dTeam.number, dSwaps[0].team.number];
                pairings[a * 2 + 1] = dSwaps[0].team;
                pairings[dSwaps[0].rank] = dTeam;
                swapList.push(swapListEntry);
            }

            //Having resolved the conflict, start at the top again
            //and check for new conflicts
            a = -1;
        }
    }
    return pairings;
}
