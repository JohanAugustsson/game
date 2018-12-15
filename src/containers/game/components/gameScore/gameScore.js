import React, {Component} from 'react';
import {getUsersFromDatabase} from "../../../../store/actions/userActions";
import connect from "react-redux/es/connect/connect";
import PlayerAddSub from "../../../../components/players/PlayerAddSub";
import {Player} from "../../../../model/player";
import {getGameFromDatabase} from "../../../../store/actions/gameActions";
import "./gameScore.css";
import {addScoreActivityToGame} from "../../../../store/actions/gameActivityActions";


class GameScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentGameId: this.props.match.params.id
        };

        const {users, currentGame, dispatch} = props;
        if (!users.isFetched) {
            dispatch(getUsersFromDatabase());
        }
        if (!currentGame.isFetched) {
            dispatch(getGameFromDatabase(this.state.currentGameId))
        }
    }

    renderPlayer() {
        const {currentGame, users} = this.props;
        if (currentGame.data != null && currentGame.data.members != null) {
            return Object.keys(currentGame.data.members).map(player => {
                let usr = {};
                Object.keys(users.data).map(user => {
                    if (users.data[user].uid === currentGame.data.members[player].uid) {
                        usr = users.data[user];
                    }
                });
                let val = 0;
                Object.keys(currentGame.data.activities).map(activity => {
                    if (currentGame.data.activities[activity].userId === currentGame.data.members[player].uid) {
                        val = val + currentGame.data.activities[activity].value;
                    }
                });
                return new Player(currentGame.data.members[player].uid, usr.firstName, val, currentGame.data.id, currentGame.data.members[player].team)
            });
        }
        return [];
    }

    onAdd(player) {
        const {dispatch} = this.props;
        dispatch(addScoreActivityToGame({player, value: 1}))
    }


    onSub(player) {
        const {dispatch} = this.props;
        dispatch(addScoreActivityToGame({player, value: -1}))
    }

    render() {
        let plays = this.renderPlayer();
        return (
            <div className={'row'}>
                <div className={'column'}>
                    <div>
                        {plays.filter(player => !player.isHome()).map((player, i) =>
                            <ul key={i}>
                                <PlayerAddSub key={i} player={player} onAdd={() => this.onAdd(player)}
                                              onSubstract={() => this.onSub(player)}/>
                            </ul>)}
                    </div>
                </div>
                <div className={'column'}>
                    <div>
                        {plays.filter(player => player.isHome()).map((player, i) =>
                            <ul key={i}>
                                <PlayerAddSub player={player} onAdd={() => this.onAdd(player)}
                                              onSubstract={() => this.onSub(player)}/>
                            </ul>)}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users,
    games: state.games,
    currentGame: state.currentGame,
});

export default connect(mapStateToProps)(GameScore)