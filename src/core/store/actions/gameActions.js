import firebase from "firebase";
// import { SET_GAMES } from '../reducers/GameReducer';
import {snackbarError, snackbarMsg} from './SnackbarActions'
import {SET_GAMES} from '../reducers/allGamesReducer';
import {SET_GAME} from '../reducers/gameReducer';


const setGames = (payload) => ({
    type: SET_GAMES,
    payload
});
const setGame = (payload) => ({
    type: SET_GAME,
    payload
});


const getGames = (serieId) => async (dispatch) => {
    return firebase.firestore()
        .collection('games')
        .where('serieId', '==', serieId)
        .get()
        .then(function (querySnapshot) {
            const games = {};
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                games[doc.id] = doc.data();
            });
            dispatch(setGames(games))
            return Promise.resolve();
        });
}

const getGame = (gameId) => async (dispatch) => {
    return firebase.firestore()
        .collection('games')
        .doc(gameId)
        .get()
        .then(function (doc) {
            const game = doc.data();
            dispatch(setGame(game))
            return Promise.resolve();
        });
}


//
// const getGamesFromDatabase = (data) => async (dispatch) => {
//     return getGamesFromFirestore().then((games) => {
//         dispatch(setGames(games));
//     });
// };
//
// function getGamesFromFirestore(user) {
//     return firebase.firestore()
//         .collection("games")
//         .get()
//         .then(function (querySnapshot) {
//             const games = {};
//             querySnapshot.forEach(function (doc) {
//                 games[doc.id] = doc.data();
//             });
//             return games;
//         });
// }
//
//
// const getGameFromDatabase = (gameId) => async (dispatch) => {
//     return getGameFromFirestore(gameId).then((game) => {
//         dispatch(setGames(game));
//     });
// };
//
// //
// function getGameFromFirestore(gameId) {
//     return firebase.firestore()
//         .collection("games")
//         .where("id", "==", gameId)
//         .get()
//         .then(function (querySnapshot) {
//             const games = {};
//             querySnapshot.forEach(function (doc) {
//                 games[doc.id] = doc.data();
//             });
//             return games;
//         });
// }
//
//
//
// let unsubscribe = false;
// const selectGame = (game) => async (dispatch) => {
//
//     // tar bort eventuellt tidigare lyssnare innann vi fortsätter
//     if (unsubscribe) {
//         unsubscribe();
//     }
//
//     // lägger till nuvarande gane som pågående
//     dispatch(setGame(game));
//
//     // lägger till lyssnare i firestore databas.
//     // Den fångar även upp alla tidigare händelser och returnerar detta
//     // när man lägger till en händelse kommer den att dyka upp 2ggr för närvarnde..
//     // beror på att serverTimestamp sätts efter att dokumentet skapats i databasen.
//     return unsubscribe = firebase.firestore()
//         .collection("gameActivity")
//         .where("gameId", "==", game.id)
//         .onSnapshot(function (snapshot) {
//             snapshot.docChanges().forEach(function (change) {
//                 console.log('nu har något hänt');
//                 if (change.type === "added") {
//                     console.log("New log added: ", change.doc.data());
//                 }
//                 if (change.type === "modified") {
//                     console.log("log modified: ", change.doc.data());
//                 }
//                 if (change.type === "removed") {
//                     console.log("log removed: ", change.doc.data());
//                 }
//             });
//         });
// }
//
// const removeListener = () => async (dispatch) => {
//     console.log('ta bort listener');
//     if (unsubscribe) {
//         return unsubscribe();
//     }
//     return null;
// }


// --------------------- NEW --------------------------------------------

// Created now according to the new layout. think we can remove mutch above
// ------------------ Create Game -----------------------------------------
const createNewGame = (game) => async (dispatch) => {
    const docRef = firebase.firestore().collection('games').doc();
    game.id = docRef.id;
    game.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    await addGamePlayers(game);

    delete game.playersHome;
    delete game.playersAway;
    return docRef.set(game)
        .then(() => {
            // skapa nytt game
            //return dispatch(addGame(game));
            return null;
        }).then(() => {
            dispatch(snackbarMsg('Success'));
            return (game);
        })
        .catch(() => {
            return dispatch(snackbarError('Sorry something went wrong'))
        });

};

const addGamePlayers = (game) => {
    const promises = [];
    const {createdAt, id, groupId, serieId} = game;
    if (!game.playersHome || !game.playersAway) return Promise.resolve([]);

    game.playersHome.forEach(uid => {
        promises.push(createPlayer({userUid: uid, createdAt, groupId, serieId, gameId: id, team: 'Home'}))
    })
    game.playersAway.forEach(uid => {
        promises.push(createPlayer({userUid: uid, createdAt, groupId, serieId, gameId: id, team: 'Away'}))
    })
    return Promise.all(promises);
}

const createPlayer = (player) => {
    const docRef = firebase.firestore().collection('gamePlayers').doc();
    player.uid = docRef.id;
    return docRef.set(player);
}

// ---------------------  END --------------------------------

export {createNewGame, getGames, getGame};
