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

const addScoreActivityToGame = (data) => async (dispatch) => {
    let gameActivity = {};
    gameActivity.type = "SCORE";
    gameActivity.gameId = data.player.gameId;
    gameActivity.value = data.value;
    gameActivity.userId = data.player.uid;
    gameActivity.createdAt = firebase.firestore.FieldValue.serverTimestamp();

    const docRef = firebase.firestore().collection(COLLECTION_NAME).doc();
    gameActivity.id = docRef.id;
    docRef.set(gameActivity).then(() => {
        dispatch(addScoreActivity(gameActivity));
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

    // tar bort eventuellt tidigare lyssnare innann vi fortsätter
    if (unsubscribe) {
        unsubscribe();
    }

    // Todo: Dispatcha listeners to store för att se vilka lyssnare som e aktiva?
    dispatch({type: "none"});

    // Den fångar även upp alla tidigare händelser och returnerar detta
    // när man lägger till en händelse kommer den att dyka upp 2ggr för närvarnde..
    // beror på att serverTimestamp sätts efter att dokumentet skapats i databasen.
    return unsubscribe = firebase.firestore()
        .collection(COLLECTION_NAME)
        .where("gameId", "==", gameId)
        .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                console.log('nu har något hänt');
                if (change.type === "added") {
                    console.log("New log added: ", change.doc.data());
                }
                if (change.type === "modified") {
                    console.log("log modified: ", change.doc.data());
                }
                if (change.type === "removed") {
                    console.log("log removed: ", change.doc.data());
                }
            });
        });
};

const removeListener = () => async () => {
    console.log('ta bort listener för: ' + COLLECTION_NAME);
    if (unsubscribe) {
        return unsubscribe();
    }
    return null;
};

export {addScoreActivity, addGameActivities, addScoreActivityToGame, getGameActivitiesByGameId, listenAtActivity};
