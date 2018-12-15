export class Player {

    uid = null;
    name = null;
    value = null;
    gameId = null;
    team = null;

    constructor(uid, name, value, gameId, team) {
        this.uid = uid;
        this.name = name;
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