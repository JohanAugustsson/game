import firebase from "firebase";
import {
    GAMEPLAYER_ADD_PLAYER,
    GAMEPLAYER_ADD_UPDATE_PLAYERS,
    GAMEPLAYER_INIT_PLAYERS
} from "../reducers/gamePlayerReducer";

const COLLECTION_NAME = "gamePlayers";

const initPlayers = (payload) => ({
    type: GAMEPLAYER_INIT_PLAYERS,
    payload
});

const addUpdatePlayers = (payload) => ({
    type: GAMEPLAYER_ADD_UPDATE_PLAYERS,
    payload
});

const addPlayer = (payload) => ({
    type: GAMEPLAYER_ADD_PLAYER,
    payload
});

const addPlayerToGame = (user) => async (dispatch) => {
    user.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    firebase.firestore()
        .collection(COLLECTION_NAME)
        .doc()
        .set(user)
        .then((users) => {
            dispatch(addPlayer(users));
        });
};

const createOrUpdatePlayer = ({game, player}) => async (dispatch) => {
    const docRef = firebase.firestore().collection(COLLECTION_NAME);
    docRef.where("serieId", "==", game.serieId)
        .where("gameId", "==", game.id)
        .where("userUid", "==", player.uid)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                docRef.doc(querySnapshot.docs[0].id).update({team: player.team}).then(res => {
                    dispatch(addUpdatePlayers(res))
                })
            } else {
                let createdAt = firebase.firestore.FieldValue.serverTimestamp();
                let playerToStore = {
                    userUid: player.uid, createdAt, groupId: game.groupId,
                    serieId: game.serieId, gameId: game.id, team: player.team
                };
                playerToStore.uid = docRef.doc().id;

                docRef.doc().set(playerToStore).then(() => {
                    playerToStore.createdAt = firebase.firestore.Timestamp.now();
                    dispatch(addUpdatePlayers(playerToStore))
                })
            }
        });

};

const getGamePlayersFromDB = (gameId) => async (dispatch) => {
    return getGamePlayersFromFirestore(gameId).then((actions) => {
        dispatch((initPlayers(actions)));
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
const listenAtGamePlayer = (gameId) => async (dispatch) => {

    if (unsubscribe) {
        unsubscribe();
    }
    return unsubscribe = firebase.firestore()
        .collection(COLLECTION_NAME)
        .where("gameId", "==", gameId)
        .onSnapshot(function (snapshot) {
            let addedGamePlayers = {};
            snapshot.docChanges().forEach(function (change) {
                let changedGamePlayer = change.doc.data();
                if (change.type === "added" || change.type === "modified") {
                    addedGamePlayers = Object.assign({}, addedGamePlayers, {[changedGamePlayer.uid]: changedGamePlayer});
                }
            });
            dispatch(addUpdatePlayers(addedGamePlayers));
        });
};

const removeGamePlayerListener = () => {
    console.log('ta bort listener för: ' + COLLECTION_NAME);
    if (unsubscribe) {
        return unsubscribe();
    }
    return null;
};

export {
    getGamePlayersFromDB,
    addPlayer,
    addUpdatePlayers,
    listenAtGamePlayer,
    removeGamePlayerListener,
    createOrUpdatePlayer
};
