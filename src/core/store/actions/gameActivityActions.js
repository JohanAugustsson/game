import firebase from "firebase";
import {GAME_ACTIVITY_ADD_ALL, GAME_ACTIVITY_ADD_SCORE} from "../reducers/GameActivityReducer";

const COLLECTION_NAME = "gameActivity";

const addScoreActivity = (payload) => ({
    type: GAME_ACTIVITY_ADD_SCORE,
    payload
});

const addGameActivities = (payload) => ({
    type: GAME_ACTIVITY_ADD_ALL,
    payload
});

const addScoreActivityToGame = ({player, value}) => async (dispatch) => {
    console.log(player);
    let gameActivity = {};
    gameActivity.type = "SCORE";
    gameActivity.gameId = player.gameId;
    gameActivity.serieId = player.serieId;
    gameActivity.groupId = player.groupId;
    gameActivity.value = value;
    gameActivity.userUid = player.uid;
    gameActivity.createdAt = firebase.firestore.FieldValue.serverTimestamp();

    const docRef = firebase.firestore().collection(COLLECTION_NAME).doc();
    gameActivity.id = docRef.id;
    docRef.set(gameActivity).then(() => {
        dispatch({type: "none"});
    }).catch((error) => {
        console.log('något gick fel:', error);
    });
};

const getGameActivitiesByGameId = (gameId) => async (dispatch) => {
    return getGameActivitiesFromFirestore(gameId).then((actions) => {
        dispatch((addGameActivities(actions)));
    });
};

function getGameActivitiesFromFirestore(gameId) {
    return firebase.firestore()
        .collection(COLLECTION_NAME)
        .where('gameId', '==', gameId)
        .get()
        .then(function (querySnapshot) {
            const gameActivities = {};
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                gameActivities[doc.id] = doc.data();
            });
            return gameActivities;
        });
}

let unsubscribe = false;
const listenAtActivity = (gameId) => async (dispatch) => {

    if (unsubscribe) {
        unsubscribe();
    }
    return unsubscribe = firebase.firestore()
        .collection(COLLECTION_NAME)
        .where("gameId", "==", gameId)
        .onSnapshot(function (snapshot) {
            let addedActivities = {};
            snapshot.docChanges().forEach(function (change) {
                let changedActivity = change.doc.data();

                if (change.type === "added") {
                    addedActivities = Object.assign({}, addedActivities, {[changedActivity.id]: changedActivity});
                }
            });
            dispatch(addGameActivities(addedActivities));
        });
};

const removeActivityListener = () => {
    console.log('ta bort listener för: ' + COLLECTION_NAME);
    if (unsubscribe) {
        return unsubscribe();
    }
    return null;
};

export {
    addScoreActivity,
    addGameActivities,
    addScoreActivityToGame,
    getGameActivitiesByGameId,
    listenAtActivity,
    removeActivityListener
};
