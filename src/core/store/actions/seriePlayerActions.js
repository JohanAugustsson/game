import firebase from "firebase";
import {SERIEPLAYERS_ADD_PLAYERS} from "../reducers/seriePlayerReducer";

const COLLECTION_NAME = "seriePlayers";

const addSeriePlayers = (payload) => ({
    type: SERIEPLAYERS_ADD_PLAYERS,
    payload
});

const getSeriePlayers = (gameId) => async (dispatch) => {
    return getSeriePlayersFromFirestore(gameId).then((actions) => {
        dispatch((addSeriePlayers(actions)));
    });
};

function getSeriePlayersFromFirestore(serieId) {
    return firebase.firestore()
        .collection(COLLECTION_NAME)
        .where('serieId', '==', serieId)
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

export {getSeriePlayers};
