import firebase from "firebase";
import {GAMEPLAYER_ADD_PLAYER, GAMEPLAYER_ADD_PLAYERS} from "../reducers/GamePlayerReducer";

const COLLECTION_NAME = "gameMembers";

const addPlayers = (payload) => ({
    type: GAMEPLAYER_ADD_PLAYERS,
    payload
});

const addPlayer = (payload) => ({
    type: GAMEPLAYER_ADD_PLAYER,
    payload
});

const addPlayerToGame = (user) => async (dispatch) => {
    user.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    firebase.firestore()
        .collection('gameMembers')
        .doc()
        .set(user)
        .then((users) => {
            dispatch(addPlayer(users));
        });
};

const getGamePlayersFromDB = (gameId) => async (dispatch) => {
    return getGamePlayersFromFirestore(gameId).then((actions) => {
        dispatch((addPlayers(actions)));
    });
};

function getGamePlayersFromFirestore(gameId) {
    return firebase.firestore()
        .collection(COLLECTION_NAME)
        .where('gameId', '==', gameId)
        .get()
        .then(function (querySnapshot) {
            const players = {};
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                players[doc.id] = doc.data();
            });
            return players;
        });
}

let unsubscribe = false;
const listenAtGamePlayer = (game) => async (dispatch) => {

    // tar bort eventuellt tidigare lyssnare innann vi fortsätter
    if (unsubscribe) {
        unsubscribe();
    }

    // Den fångar även upp alla tidigare händelser och returnerar detta
    // när man lägger till en händelse kommer den att dyka upp 2ggr för närvarnde..
    // beror på att serverTimestamp sätts efter att dokumentet skapats i databasen.
    return unsubscribe = firebase.firestore()
        .collection(COLLECTION_NAME)
        .where("gameId", "==", game.id)
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

export {getGamePlayersFromDB, addPlayer, addPlayers, listenAtGamePlayer};
