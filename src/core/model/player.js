export class Player {

    uid = null;
    firstName = null;
    value = null;
    gameId = null;
    team = null;
    serieId = null;
    groupId = null;

    constructor(uid, firstName, value, gameId, team, serieId, groupId ) {
        this.uid = uid;
        this.firstName = firstName;
        this.value = value;
        this.gameId = gameId;
        this.team = team;
        this.serieId = serieId;
        this.groupId = groupId;
    }

    adding() {
        console.log("adding")
    }

    isHome() {
        return this.team === 'Home';
    }

    isAway() {
        return this.team === 'Away';
    }
}
