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
    return r1teams;
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