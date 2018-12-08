import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Game.css";
import { createNewUser } from '../../actions/authAction'
import { getUsersFromDatabase } from '../../actions/userActions'
import { getGamesFromDatabase } from '../../actions/gameActions'
import Button from '../../atoms/buttons/buttons';
import GameView from './GameView';

class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      gameId: '',
      gameName:'',
    }

    const { users, games, dispatch } = props;
    if ( !users.isFetched ){
      dispatch(getUsersFromDatabase());
    }
    if ( !games.isFetched ){
      dispatch(getGamesFromDatabase());
    }
  }
  updateInput = (e,stateKey)=> {
    this.setState({ [stateKey]: e.target.value });
  }

  createUser = () =>{
    const { dispatch } = this.props;
    const { email , password, firstName, lastName } = this.state;
    const data = {
      email,
      password,
      firstName,
      lastName,
    }
    dispatch(createNewUser(data));
  }

  render(){
    const { email, password, firstName, lastName } = this.state;
    return(
      <div className={'container-game'}>
        <div className={'wrapper-game'}>
          <div>first</div>
          <div>mitt</div>
          <div>last</div>
        </div>
        <GameView />

        <Button variant={'btn-add'} onClick={this.createUser}> + </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart : state.cart,
  users: state.users,
  games: state.games,
})

export default connect(mapStateToProps)(Game)
