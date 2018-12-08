import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Game.css";
import { addUserToGame, addGame } from '../../actions/gameActions'

import Button from '../../atoms/buttons/buttons';

class GameView extends Component{
  constructor(props){
    super(props);
    this.state = {
      gameId: '',
      gameName:'',
    }

    // const { game, dispatch } = props;
    // if ( !game.isFetched ){
    //   dispatch(getUsersFromDatabase());
    // }
  }
  updateInput = (e,stateKey)=> {
    this.setState({ [stateKey]: e.target.value });
  }

  createUser = () =>{
    console.log('tjhio');
  }

  createUserList = () => {
    const users = this.props.users.data;
    const {currentGame} = this.props;

    if (!users) return null;


    return Object.values(users).map(user=>(
      <li>
        {user.firstName}
        <Button variant={'btn-add'} onClick={()=> this.addToGame({uid: user.uid, })}> Hemma </Button>
        <Button variant={'btn-add'}> Borta </Button>
      </li>
    ));
  }
  createGameList = () => {
    const games = this.props.games.data;
    if (!games) return null;

    return Object.values(games).map(games=>(
      <li>
        {games.title}
        <Button variant={'btn-add'} > Select </Button>

      </li>
    ));
  }

  addToGame = () =>{
    const { dispatch } = this.props;
    dispatch(addUserToGame())
  }

  createGame = () => {
    const { dispatch } = this.props;
    dispatch(addGame({title: 'first Game'}));
  }

  render(){
    const { email, password, firstName, lastName } = this.state;
    const userList = this.createUserList();
    const gameList = this.createGameList();

    return(
      <div className={'container-game'}>
        <ul>
          {userList}
        </ul>
        <ul>
          {gameList}
        </ul>

        <Button variant={'primary'} onClick={this.createGame}> Skapa game </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  games: state.games,
  currentGame: state.currentGame,
})

export default connect(mapStateToProps)(GameView)
