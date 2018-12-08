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

  renderPlayerList = () => {
    const { currentGame } = this.props;
    const { members } = currentGame.data;
    if (!members) return null;

    const home = [];
    const away = [];
    Object.values(members).forEach(member =>{
      if (member.team === 'Home'){
        home.push(this.createPlayer(member));
      } else {
        away.push(this.createPlayer(member));
      }
    })
    console.log(home);
    console.log(away);
    return {home,away};
  }

  createPlayer = (member) =>(

    <li> {member.uid} </li>
  )

  render(){
    const { email, password, firstName, lastName } = this.state;
    const { currentGame } = this.props;

    const teamList =  (currentGame.data && currentGame.data.members) ? this.renderPlayerList() : {home: null, away:null};

    return(
      <div className={'container-game'}>
        <div className={'wrapper-game'}>
          <div>
            <ul>
              {teamList.home}
            </ul>
          </div>
          <div>
            <ul>
              {teamList.away}
            </ul>
          </div>
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
  currentGame: state.currentGame,
})

export default connect(mapStateToProps)(Game)
