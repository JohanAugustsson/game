import React, {Component} from 'react';
import {connect} from 'react-redux'
import "./Game.css";
import {addGame, addUserToGame, setGame} from '../../store/actions/gameActions'

import Button from '../../atoms/buttons/buttons';

class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: '',
            gameName: '',
        }

        // const { game, dispatch } = props;
        // if ( !game.isFetched ){
        //   dispatch(getUsersFromDatabase());
        // }
    }

    updateInput = (e, stateKey) => {
        this.setState({[stateKey]: e.target.value});
    };

    createUser = () => {
    };

    createUserList = () => {
        const users = this.props.users.data;
        const {currentGame} = this.props;
        const gameId = currentGame.data.id;
        if (!users) return null;


        return Object.values(users).map(user => (
            <li>
                {user.firstName}
                <Button variant={'btn-add'} onClick={() => this.addUserToGame({
                    uid: user.uid,
                    gameId: gameId,
                    team: 'Home'
                })}> Hemma </Button>
                <Button variant={'btn-add'} onClick={() => this.addUserToGame({
                    uid: user.uid,
                    gameId: gameId,
                    team: 'Away'
                })}> Borta </Button>
            </li>
        ));
    };
    createGameList = () => {
        const games = this.props.games.data;
        const {dispatch} = this.props;
        if (!games) return null;

        return Object.values(games).map(game => (
            <li>
                {game.title}
                <Button variant={'btn-add'} onClick={() => dispatch(setGame(game))}> Select </Button>
            </li>
        ));
    };


    addUserToGame = (data) => {
        const {dispatch} = this.props;
        console.log('användare data', data);
        dispatch(addUserToGame(data))
    };

    createGame = () => {
        const {dispatch} = this.props;
        console.log('skapar game');
        dispatch(addGame({title: 'first Game'}));
    };

    render() {
        const {email, password, firstName, lastName} = this.state;
        const userList = this.createUserList();
        const gameList = this.createGameList();


        return (
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
});

export default connect(mapStateToProps)(GameView)
