import firebase from "firebase";
import {GAME_ACTIVITY_ADD_ALL, GAME_ACTIVITY_ADD_SCORE} from "../reducers/GameActivityReducer";

const COLLECTION_NAME = "game_activities";

const createGameActivity = (payload) => ({
    type: GAME_ACTIVITY_ADD_SCORE,
    payload
});

const addGameActivities = (payload) => ({
    type: GAME_ACTIVITY_ADD_ALL,
    payload
});

const addGameActivity = (val) => async (dispatch) => {
    let gameActivity = {};
    gameActivity.type = "SCORE";
    gameActivity.gameId = "1";
    gameActivity.value = val;
    gameActivity.createdAt = firebase.firestore.FieldValue.serverTimestamp();

    const docRef = firebase.firestore().collection(COLLECTION_NAME).doc();
    gameActivity.id = docRef.uid;

    docRef.set(gameActivity).then(() => {
        dispatch(addGameActivity(gameActivity));
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
                gameActivities[doc.uid] = doc.data();
            });
            return gameActivities;
        });
}

export {createGameActivity, addGameActivities};