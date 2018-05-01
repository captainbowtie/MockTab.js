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
