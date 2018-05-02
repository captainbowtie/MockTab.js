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
    return pairings;
}

function pairRound2(teams) {
    //Sort teams into needs plaintiff and needs defense
    var needsP = [];
    var needsD = [];
    for (var a = 0; a < teams.length; a++) {
        if (teams[a].r1plaintiff) {
            needsD.push(teams[a]);
        } else {
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

    return pairings;
}

function pairRound3(teams) {
    var r3teams = teams.slice();
    r3teams = rankTeams(r3teams);
    var pairings = [];
    for (var a = 0; a < r3teams.length / 2; a++) {
        pairings.push([r3teams[a * 2], r3teams[a * 2 + 1]]);
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
        } else {
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
            } else {
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

function resolveImpermissible(pairings, roundNumber) {
    var swapList = [];
    //Iterate through each pairing
    for (var a = 0; a < pairings.length; a++) {
        //Assign teams to variables to make syntax easier to understand
        var pTeam = pairings[a][0];
        var dTeam = pairings[a][1];

        //Check if the pairing is a conflict
        if (pTeam.conflicts.includes(dTeam.number ||
                dTeam.conflicts.includes(pTeam.number))) {
            if (roundNumber == 1) {
                //Resolve round 1 pairings by trying randomization again, it has to work eventually :)
                pairings = pairRound1();
            } else if (roundNumber == 2 || roundNumber == 4) {

                //Create list of all possible swaps for each side
                var pAllSwaps = [];
                var dAllSwaps = [];
                //Iterate through all teams and add them to potential swap list
                for (var b = 0; b < pairings.length; b++) {
                    //Don't add a swap with itself to the list
                    if (b != a) {
                        pAllSwaps.push({
                            "team": pairings[b][0],
                            "rankDistance": Math.abs(a - b),
                            "winDistance": Math.abs(pairings[a][0].wins - pairings[b][0].wins),
                            "csDistance": Math.abs(pairings[a][0].cs - pairings[b][0].cs),
                            "pdDistance": Math.abs(pairings[a][0].pd - pairings[b][0].pd)
                        });
                        dAllSwaps.push({
                            "team": pairings[b][1],
                            "rankDistance": Math.abs(a - b),
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
                        pAllSwaps.splice(b, 1);//if so, remove the swap
                    }

                    //Check if swap list containds dSwap
                    if (swapList.includes([dTeam.number, dSwapTeam.number]) ||
                            swapList.includes([dSwapTeam.number, dTeam.number])) {
                        dAllSwaps.splice(b, 1);//if so, remove the swap
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
                    if (pAllSwaps[b].rankDistance < minPRankDistance) {
                        minPRankDistance = pAllSwaps[b].rankDistance;
                    }
                }
                for (var b = 0; b < dAllSwaps.length; b++) {
                    if (dAllSwaps[b].rankDistance < minDRankDistance) {
                        minDRankDistance = dAllSwaps[b].rankDistance;
                    }
                }

                //Remove any swaps whose rank distance is greater than the min
                for (var b = 0; b < pAllSwaps.length; b++) {
                    if (pAllSwaps[b].rankDistance > minPRankDistance) {
                        pAllSwaps.splice(b, 1);
                    }
                }
                for (var b = 0; b < dAllSwaps.length; b++) {
                    if (dAllSwaps[b].rankDistance > minDRankDistance) {
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
                for (var b = 0; b < pAllSwaps.length; b++) {
                    if (pAllSwaps[b].winDistance > minPWinDistance) {
                        pAllSwaps.splice(b, 1);
                    }
                }
                for (var b = 0; b < dAllSwaps.length; b++) {
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
                for (var b = 0; b < pAllSwaps.length; b++) {
                    if (pAllSwaps[b].csDistance > minPCSDistance) {
                        pAllSwaps.splice(b, 1);
                    }
                }
                for (var b = 0; b < dAllSwaps.length; b++) {
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
                for (var b = 0; b < pAllSwaps.length; b++) {
                    if (pAllSwaps[b].pdDistance > minPPDDistance) {
                        pAllSwaps.splice(b, 1);
                    }
                }
                for (var b = 0; b < dAllSwaps.length; b++) {
                    if (dAllSwaps[b].pdDistance > minDPDDistance) {
                        dAllSwaps.splice(b, 1);
                    }
                }


            } else if (roundNumber == 3) {

            }
        }
    }
}
