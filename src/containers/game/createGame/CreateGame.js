import React, {Component} from 'react';
import {connect} from 'react-redux'
import Button from '../../../atoms/buttons/buttons';
import { createNewGame } from '../../../store/actions/gameActions'
// import "./Game.css";



class CreateGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: '',
            gameName: '',
        }

        // const { game, userIsFetched, dispatch } = props;
        // if ( !game.isFetched ){
        //   dispatch(getGamesFromDatabase());
        // }
        // if (!userIsFetched) {
        //     dispatch(getUsersFromDatabase());
        // }
    }

    updateInput = (e, stateKey) => {
        this.setState({[stateKey]: e.target.value});
    };


    createGame = () => {
        const {dispatch} = this.props;
        console.log('skapar game');
        dispatch(createNewGame({title: 'first Game'}));
    };


    render() {
        return (
            <div className={'container-game'}>
                skapa ett game

            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    users: store.users,
    games: store.games,
    game: store.game,
    userIsFetched: store.users.isFetched
});

export default connect(mapStateToProps)(CreateGame)
