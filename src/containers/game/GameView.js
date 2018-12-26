import React, {Component} from 'react';
import {connect} from 'react-redux'
import "./Game.css";
import { selectGame } from '../../store/actions/gameActions'
import {getGamesFromDatabase} from '../../store/actions/gameActions'
import {getUsersFromDatabase} from '../../store/actions/userActions'

import Button from '../../atoms/buttons/buttons';

class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: '',
            gameName: '',
        }

        const { games, userIsFetched, dispatch } = props;
        if ( !games.isFetched ){
          dispatch(getGamesFromDatabase());
        }
        if (!userIsFetched) {
            dispatch(getUsersFromDatabase());
        }
    }

    updateInput = (e, stateKey) => {
        this.setState({[stateKey]: e.target.value});
    };

    createUser = () => {
    };

    createGameList = () => {
        const games = this.props.games.data;
        const {dispatch} = this.props;
        if (!games) return null;

        return Object.values(games).map(game => (
            <li key={game.id}>
                {game.title}
                <Button variant={'btn-add'} onClick={() => dispatch(selectGame(game))}> Select </Button>
            </li>
        ));
    };


    render() {
        const gameList = this.createGameList();
        return (
            <div className={'container-game'}>
                Välj game
                <ul>
                    {gameList}
                </ul>
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

export default connect(mapStateToProps)(GameView)
