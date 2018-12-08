import firebase from "firebase";
import { ADD_USER_TO_GAME, REMOVE_USER_FROM_GAME, ADD_GAME } from '../reducers/GameReducer';
import { SET_ALL_GAMES } from '../reducers/AllGamesReducer';


const addUser = (payload) => ({
  type: ADD_USER_TO_GAME,
  payload
})

const removeUser = (payload) => ({
  type: REMOVE_USER_FROM_GAME,
  payload
})

const setGame = (payload) => ({
  type: ADD_GAME,
  payload
})


const setAllGames = (payload) => ({
  type: SET_ALL_GAMES,
  payload
})

const addUserToGame = (data) => async (dispatch) => {
  console.log("användare:",data);
  return addUserToGameInFirestore(data).then((users)=>{
    console.log('funkars');
    dispatch(addUser(data));
  });
};

function addUserToGameInFirestore(user) {
  user.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  return firebase.firestore().collection('gameMembers').doc().set(user);
}


const addGame = (data) => async (dispatch) => {
  return addGameInFirestore(data)
    .then((game)=>{
      console.log('x');
      dispatch(setGame(data));
    }).catch((error)=>{
      console.log('något gick fel:', error);
    });
};

function addGameInFirestore(game) {
  console.log('spara ner game', game);
  game.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  const docRef = firebase.firestore().collection('games').doc();
  game.id = docRef.id;
  return docRef.set(game);
}



const getGamesFromDatabase = (data) => async (dispatch) => {
  return getGamesFromFirestore().then((games)=> {

    const promises = [];
    Object.values(games).forEach(game =>{
      promises.push(getMemberList(game));
    })

    return Promise.all(promises);
    }).then((populatedGames)=>{

      console.log('populatedGames', populatedGames);
      dispatch(setAllGames(populatedGames));
    });
};

function getGamesFromFirestore(user) {
  return firebase.firestore()
    .collection("games")
    .get()
    .then(function(querySnapshot) {
    const games = {};
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        games[doc.id] = doc.data();
    });
    console.log('games:', games);
    return games;
  });
}


const getMemberList = (game) => {
  console.log("inne i getMemberList", game);

  return firebase.firestore()
    .collection("gameMembers")
    .where('gameId', '==', game.id)
    .get()
    .then(function(querySnapshot) {
    const members = {};
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        members[doc.id] = doc.data();
    });
    console.log('members:', members);
    game.members = members;
    return game;
  });
}

export { addUserToGame, addGame, getGamesFromDatabase, setGame };
