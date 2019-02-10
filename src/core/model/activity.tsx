import {FirebaseMetadata} from "./firebaseMetadata";
import {InterfaceCreatedAt} from "./firebaseTimestamp";

export class Activity extends FirebaseMetadata {
    gameId: string;
    serieId: string;
    groupId: string;
    userUid: string;

    constructor(id: string, createdAt: InterfaceCreatedAt, gameId: string,
                serieId: string, groupId: string, userUid: string) {
        super(id, createdAt);
        this.gameId = gameId;
        this.serieId = serieId;
        this.groupId = groupId;
        this.userUid = userUid;
    }
}
