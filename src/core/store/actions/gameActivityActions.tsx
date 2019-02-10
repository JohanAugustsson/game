import firebase from "firebase";
import {Player} from "../../model/player";
import {GAME_ACTIVITY_ADD_ALL, GAME_ACTIVITY_ADD_SCORE} from "../reducers/gameActivityReducer";

const COLLECTION_NAME = "gameActivity";

const addScoreActivity = (payload: any) => ({
    payload,
    type: GAME_ACTIVITY_ADD_SCORE,
});

const addGameActivities = (payload: any) => ({
    payload,
    type: GAME_ACTIVITY_ADD_ALL,
});

const addScoreActivityToGame = (player: Player, value: number) => async (dispatch: any) => {
    const gameActivity: any = {};
    gameActivity.type = "SCORE";
    gameActivity.gameId = player.gameId;
    gameActivity.serieId = player.serieId;
    gameActivity.groupId = player.groupId;
    gameActivity.value = value;
    gameActivity.userUid = player.uid;
    gameActivity.team = player.team;
    gameActivity.createdAt = firebase.firestore.FieldValue.serverTimestamp();

    const docRef = firebase.firestore().collection(COLLECTION_NAME).doc();
    gameActivity.id = docRef.id;
    docRef.set(gameActivity).then(() => {
        gameActivity.createdAt = firebase.firestore.Timestamp.now();
        dispatch(addScoreActivity(gameActivity));
    }).catch((error) => {
        console.log("addScoreActivityToGame error:", error);
    });
};

const getGameActivitiesByGameId = (gameId: string) => async (dispatch: any) => {
    return getGameActivitiesFromFirestore(gameId).then((actions) => {
        dispatch((addGameActivities(actions)));
    });
};

function getGameActivitiesFromFirestore(gameId: any) {
    return firebase.firestore()
        .collection(COLLECTION_NAME)
        .where("gameId", "==", gameId)
        .get()
        .then((querySnapshot) => {
            const gameActivities: any = {};
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                gameActivities[doc.id] = doc.data();
            });
            return gameActivities;
        });
}

let unsubscribe: any = false;
const listenAtActivity = (gameId: any) => async (dispatch: any) => {

    if (unsubscribe) {
        unsubscribe();
    }
    return unsubscribe = firebase.firestore()
        .collection(COLLECTION_NAME)
        .where("gameId", "==", gameId)
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
            let addedActivities = {};
            snapshot.docChanges().forEach((change) => {
                const changedActivity = change.doc.data();

                if (change.type === "added") {
                    addedActivities = {...addedActivities, [changedActivity.id]: changedActivity};
                }
            });

            dispatch(addGameActivities(addedActivities));
        });
};

const removeActivityListener = () => {
    console.log("ta bort listener för: " + COLLECTION_NAME);
    if (unsubscribe) {
        return unsubscribe();
    }
    return null;
};

export {
    addScoreActivity,
    addGameActivities,
    addScoreActivityToGame,
    listenAtActivity,
    removeActivityListener,
};
