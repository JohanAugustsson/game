import firebase from "firebase";
import {ADD_USER_TO_GAME, REMOVE_USER_FROM_GAME, ADD_GAME} from '../reducers/GameReducer';
import {SET_ALL_GAMES} from '../reducers/AllGamesReducer';


const addUser = (payload) => ({
    type: ADD_USER_TO_GAME,
    payload
});

const removeUser = (payload) => ({
    type: REMOVE_USER_FROM_GAME,
    payload
});

const setGame = (payload) => ({
    type: ADD_GAME,
    payload
});


const setAllGames = (payload) => ({
    type: SET_ALL_GAMES,
    payload
});

const addUserToGame = (data) => async (dispatch) => {
    return addUserToGameInFirestore(data).then((users) => {
        dispatch(addUser(data));
    });
};

function addUserToGameInFirestore(user) {
    user.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    return firebase.firestore().collection('gameMembers').doc().set(user);
}


const addGame = (data) => async (dispatch) => {
    return addGameInFirestore(data)
        .then((game) => {
            dispatch(setGame(data));
        }).catch((error) => {
            console.log('något gick fel:', error);
        });
};

function addGameInFirestore(game) {
    game.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const docRef = firebase.firestore().collection('games').doc();
    game.id = docRef.uid;
    return docRef.set(game);
}


const getGamesFromDatabase = (data) => async (dispatch) => {
    return getGamesFromFirestore().then((games) => {

        const promises = [];
        Object.values(games).forEach(game => {
            promises.push(getMemberList(game));
        });

        return Promise.all(promises);
    }).then((populatedGames) => {

        dispatch(setAllGames(populatedGames));
    });
};

function getGamesFromFirestore(user) {
    return firebase.firestore()
        .collection("games")
        .get()
        .then(function (querySnapshot) {
            const games = {};
            querySnapshot.forEach(function (doc) {
                games[doc.uid] = doc.data();
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


const getMemberList = (game) => {
    return firebase.firestore()
        .collection("gameMembers")
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

export {addUserToGame, addGame, getGamesFromDatabase, getGameFromDatabase, setGame};
