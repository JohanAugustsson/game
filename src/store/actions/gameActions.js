import firebase from "firebase";
import { SET_GAMES, ADD_GAME } from '../reducers/GameReducer';
import { snackbarMsg, snackbarError } from './SnackbarActions'
import {SET_ALL_GAMES} from '../reducers/AllGamesReducer';

//
// const addUser = (payload) => ({
//     type: ADD_USER_TO_GAME,
//     payload
// });

// const removeUser = (payload) => ({
//     type: REMOVE_USER_FROM_GAME,
//     payload
// });

const setGame = (payload) => ({
    type: SET_GAMES,
    payload
});

const addGame = (payload) => ({
    type: ADD_GAME,
    payload
});

const setAllGames = (payload) => ({
    type: SET_ALL_GAMES,
    payload
});
//
// const addUserToGame = (data) => async (dispatch) => {
//     return addUserToGameInFirestore(data).then((users) => {
//         dispatch(addUser(data));
//     });
// };
//
// function addUserToGameInFirestore(user) {
//     user.createdAt = firebase.firestore.FieldValue.serverTimestamp();
//     return firebase.firestore().collection('gameMembers').doc().set(user);
// }


// const createNewGame = (data) => async (dispatch) => {
//     console.log('spara data', data);
//     return addGameInFirestore(data)
//         .then((game) => {
//             dispatch(setGame(data));
//         }).catch((error) => {
//             console.log('något gick fel:', error);
//         });
// // };
//
// function addGameInFirestore(game) {
//     game.createdAt = firebase.firestore.FieldValue.serverTimestamp();
//     const docRef = firebase.firestore().collection('games').doc();
//     game.id = docRef.id;
//     return docRef.set(game);
// }
//
//
const getGamesFromDatabase = (data) => async (dispatch) => {
    return getGamesFromFirestore().then((games) => {

        const promises = [];
               Object.values(games).forEach(game => {
                   promises.push(getMemberList(game));
               });

               return Promise.all(promises)
        ;
        }).then((games) => {

        dispatch(setAllGames(games));
    });
};

function getGamesFromFirestore(user) {
    return firebase.firestore()
        .collection("games")
        .get()
        .then(function (querySnapshot) {
            const games = {};
            querySnapshot.forEach(function (doc) {
                games[doc.id] = doc.data();
            });
            return games;
        });
}


const getGameFromDatabase = (gameId) => async (dispatch) => {
    return getGameFromFirestore(gameId).then((games) => {
        const promises = [];
        Object.values(games).forEach(game => {
            promises.push(getMemberList(game));
            promises.push(getActivityList(game));
        });

        return Promise.all(promises);
    }).then((games) => {
        dispatch(setGame(games[0]));

    });
};
//
function getGameFromFirestore(gameId) {
    return firebase.firestore()
        .collection("games")
        .where("id", "==", gameId)
        .get()
        .then(function (querySnapshot) {
            const games = {};
            querySnapshot.forEach(function (doc) {
                games[doc.id] = doc.data();
            });
            return games;
        });
}
//
//
const getMemberList = (game) => {
    return firebase.firestore()
        .collection("gamePlayers")
        .where('gameId', '==', game.id)
        .get()
        .then(function (querySnapshot) {
            const members = {};
            querySnapshot.forEach(function (doc) {
                members[doc.id] = doc.data();
            });
            game.members = members;
            return game;
        });
};
//
const getActivityList = (game) => {
    return firebase.firestore()
        .collection("gameActivity")
        .where('gameId', '==', game.id)
        .get()
        .then(function (querySnapshot) {
            const activities = {};
            querySnapshot.forEach(function (doc) {
                activities[doc.id] = doc.data();
            });
            game.activities = activities;
            return game;
        });
};

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
            return dispatch(addGame(game));
        }).then(()=>{
            return dispatch(snackbarMsg('Success'));
        })
        .catch(()=>{
            return dispatch(snackbarError('Sorry something went wrong'))
        });

};

const addGamePlayers = (game) => {
    const promises = [];
    const {createdAt, id, groupId, serieId} = game;
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
  player.id = docRef.id;
  return docRef.set(player);
}

// ---------------------  END --------------------------------

export { createNewGame, getGameFromDatabase, getGamesFromDatabase };
