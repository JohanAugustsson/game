import {addScoreActivityToGame} from "../store/actions/gameActivityActions";

export class Player {

    uid: string | null = null;
    firstName: string | null = null;
    value: number | null = null;
    gameId: string | null = null;
    team: string | null = null;
    serieId: string | null = null;
    groupId: string | null = null;

    constructor(uid: string, firstName: string, value: number, gameId: string,
                team: string, serieId: string, groupId: string) {
        this.uid = uid;
        this.firstName = firstName;
        this.value = value;
        this.gameId = gameId;
        this.team = team;
        this.serieId = serieId;
        this.groupId = groupId;
    }

    isHome() {
        return this.team === "Home";
    }

    isAway() {
        return this.team === "Away";
    }

    addScore(dispatch: any) {
        dispatch(addScoreActivityToGame(this, 1));
    }

    substractScore(dispatch: any) {
        dispatch(addScoreActivityToGame(this, -1));
    }
}
