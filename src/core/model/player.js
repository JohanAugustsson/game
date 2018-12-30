export class Player {

    uid = null;
    firstName = null;
    value = null;
    gameId = null;
    team = null;

    constructor(uid, firstName, value, gameId, team) {
        this.uid = uid;
        this.firstName = firstName;
        this.value = value;
        this.gameId = gameId;
        this.team = team;
    }

    adding() {
        console.log("adding")
    }

    isHome() {
        return this.team === 'Home';
    }
}